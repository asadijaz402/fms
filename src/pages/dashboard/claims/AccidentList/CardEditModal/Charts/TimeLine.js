import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { useTheme } from "@mui/material";

const colors = [
  "#008FFB",
  "#00E396",
  "#775DD0",
  "#FEB019",
  "#FF4560",
  "rgb(77, 137, 99)",
  "rgb(105, 165, 131)",
  "rgb(225, 179, 120)",
  "rgb(224, 204, 151)",
  "rgb(236, 121, 154)",
  "rgb(159, 2, 81)",
];

export default function TimeLine({ data }) {
  const [series, setSeries] = useState([{ data: [] }]);
  const theme = useTheme();

  const randomColor = () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  const getSeries = () => {
    setSeries([
      {
        data: data.map((row, index) => {
          return {
            x: row.status,
            y: [
              index === 0
                ? moment(row.created_at, "YYYY-MM-DDThh:mm:ssZ")
                    .toDate()
                    .getTime()
                : moment(data[index - 1].updated_at, "YYYY-MM-DDThh:mm:ssZ")
                    .toDate()
                    .getTime(),
              moment(row.updated_at, "YYYY-MM-DDThh:mm:ssZ").toDate().getTime(),
            ],
            fillColor: colors.length >= index ? colors[index] : randomColor(),
          };
        }),
      },
    ]);
  };

  useEffect(() => {
    getSeries();
    // eslint-disable-next-line
  }, []);

  let options = {
    chart: {
      height: 400,
      type: "rangeBar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false,
        },
      },
    },
    tooltip: {
      theme:
        localStorage.getItem("settings") &&
        JSON.parse(localStorage.getItem("settings")).theme === "LIGHT"
          ? "light"
          : "dark",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        var label = opts.w.globals.labels[opts.dataPointIndex];
        var a = moment(val[0]);
        var b = moment(val[1]);
        var diff = b.diff(a, "days");
        return label + ": " + diff + (diff > 1 ? " days" : " day");
      },
      style: {
        // colors: ["#f3f4f5", "#fff"],
        colors: [
          theme.palette.text.primary,
          theme.palette.text.primary,
        ],
      },
    },
    xaxis: {
      type: "datetime",
      axisBorder: {
        color: theme.palette.text.secondary,
      },
      labels: {
        style: {
          colors: [theme.palette.text.primary, theme.palette.text.secondary],
        },
      },
    },
    yaxis: {
      show: false,
    },
    grid: {
      row: {
        colors: [
          theme.palette.background.default,
          theme.palette.background.paper,
        ],
        opacity: 1,
      },
    },
  };

  if (data.length !== 0) {
    return (
      <div>
        <Chart options={options} series={series} type="rangeBar" height={350} />
      </div>
    );
  } else {
    return null;
  }
}
