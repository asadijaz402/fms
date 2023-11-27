import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listData } from "../../../../slices/CustomSlices/actions/apiActions";
import moment from "moment";

export default function useVehicleTrends() {
  const [loading, setLoading] = useState(false);
  const [datasets, setDatasets] = useState({
    legend: [
      { color: "#4CAF50", title: "Total" },
      { color: "#FF9800", title: "On Hire" },
      { color: "#F44336", title: "Vehicle Off Road" },
    ],
    Monthly: {
      xaxis: { dataPoints: [] },
      datasets: [],
    },
    Daily: {
      xaxis: { dataPoints: [] },
      datasets: [],
    },
    Weekly: {
      xaxis: { dataPoints: [] },
      datasets: [],
    },
  });
  const [monthlyData, setMonthlyData] = useState({});
  const [weeklyData, setWeeklyData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  const average = (data, key) => {
    switch (key) {
      case "vor":
        return Math.round(
          data.reduce((a, b) => a + (b.total - b.hired || 0), 0) / data.length
        );
      default:
        return Math.round(
          data.reduce((a, b) => a + (b[key] || 0), 0) / data.length
        );
    }
  };

  const uniqueLabels = (data, timeframe) => {
    switch (timeframe) {
      case "month":
        return data
          .map((d) => moment(d.date, "YYYY-MM-DD").format("MMM"))
          .filter(onlyUnique);
      case "week":
        return data
          .map((d) => moment(d.date, "YYYY-MM-DD").format("WW"))
          .filter(onlyUnique);
      default:
        return data
          .map((d) => moment(d.date, "YYYY-MM-DD").format("DD"))
          .filter(onlyUnique)
          .slice(0, 7);
    }
  };

  const compileArray = (data, labels, key, timeframe) => {
    return labels.map((MMM) =>
      average(
        data.filter(
          (d) => moment(d.date, "YYYY-MM-DD").format(timeframe) === MMM
        ),
        key
      )
    );
  };

  const monthlyView = (data) => {
    let labels = uniqueLabels(data.prev_data, "month");
    setMonthlyData({
      labels: labels,
      data: {
        total: compileArray(data.prev_data, labels, "total", "MMM"),
        hired: compileArray(data.prev_data, labels, "hired", "MMM"),
        vor: compileArray(data.prev_data, labels, "vor", "MMM"),
      },
    });
  };

  const weeklyView = (data) => {
    let labels = uniqueLabels(data.prev_data, "week");
    setWeeklyData({
      labels: labels,
      data: {
        total: compileArray(data.prev_data, labels, "total", "WW"),
        hired: compileArray(data.prev_data, labels, "hired", "WW"),
        vor: compileArray(data.prev_data, labels, "vor", "WW"),
      },
    });
  };

  const dailyView = (data) => {
    let labels = uniqueLabels(data.prev_data, "day");
    setDailyData({
      labels: labels,
      data: {
        total: compileArray(data.prev_data, labels, "total", "DD"),
        hired: compileArray(data.prev_data, labels, "hired", "DD"),
        vor: compileArray(data.prev_data, labels, "vor", "DD"),
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(
      listData("hiring/dashboard/monthly-rental-history", id_token, false)
    ).then((res) => {
      monthlyView(res.data);
      weeklyView(res.data);
      dailyView(res.data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id_token]);

  useEffect(() => {
    if (Object.keys(dailyData).length > 1) {
      setDatasets({
        ...datasets,
        Daily: {
          xaxis: {
            dataPoints: dailyData.labels,
          },
          datasets: [
            {
              color: "#F44336",
              data: dailyData.data.vor,
              name: "Vehicle Off Road",
            },
            {
              color: "#FF9800",
              data: dailyData.data.hired,
              name: "On Hire",
            },

            {
              color: "#4CAF50",
              data: dailyData.data.total,
              name: "Total",
            },
          ],
        },
      });
    }
    // eslint-disable-next-line
  }, [dailyData]);

  useEffect(() => {
    if (Object.keys(weeklyData).length > 1) {
      setDatasets({
        ...datasets,
        Weekly: {
          xaxis: { dataPoints: weeklyData.labels },
          datasets: [
            {
              color: "#F44336",
              data: weeklyData.data.vor,
              name: "Vehicle Off Road",
            },
            {
              color: "#FF9800",
              data: weeklyData.data.hired,
              name: "On Hire",
            },

            {
              color: "#4CAF50",
              data: weeklyData.data.total,
              name: "Total",
            },
          ],
        },
      });
    }
    // eslint-disable-next-line
  }, [weeklyData]);

  useEffect(() => {
    if (Object.keys(monthlyData).length > 1) {
      setDatasets({
        ...datasets,
        Monthly: {
          xaxis: { dataPoints: monthlyData.labels },
          datasets: [
            {
              color: "#4CAF50",
              data: monthlyData.data.vor,
              name: "Total",
            },
            {
              color: "#FF9800",
              data: monthlyData.data.hired,
              name: "On Hire",
            },

            {
              color: "#F44336",
              data: monthlyData.data.total,
              name: "Vehicle Off Road",
            },
          ],
        },
      });
    }
    // eslint-disable-next-line
  }, [monthlyData]);

  return {
    loading,
    datasets,
  };
}
