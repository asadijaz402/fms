import React, { useEffect, useState } from "react";
import Card from "../../Card/Card";
import { listData } from "../../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";

export default function VehicleOffRoad() {
  const [data, setData] = useState({});
  const [comparison, setComparison] = useState(0.0);
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listData("hiring/dashboard/rental-history", id_token, false)).then(
      (res) => {
        setData(res.data);
        if (res.data.weekly_count.length >= 13) {
          setComparison(
            ((res.data.total_count - res.data.hired_count) /
              (res.data.weekly_count[13].total -
                res.data.weekly_count[13].hired)) *
              100 -
              100
          );
        }
      }
    );
    // eslint-disable-next-line
  }, [id_token]);

  return (
    <Card
      primary="Vehicles Off Road"
      secondary="total vehicles off road"
      compareText="than yesterday"
      primaryCount={data.total_count - data.hired_count}
      percentage={Math.round(
        ((data.total_count - data.hired_count) / data.total_count) * 100
      )}
      comparePercentage={comparison.toFixed(2)}
      compareState={comparison.toFixed(2) < 0 ? false : true}
      href="/fleet/vehicles/offhire"
    />
  );
}
