import React, { useEffect, useState } from "react";
import Card from "../../Card/Card";
import { listData } from "../../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";

export default function TotalVehicles() {
  const [data, setData] = useState({});
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listData("vehicle/dashboard/total/vehicle", id_token, false)).then(
      (res) => {
        setData(res.data);
      }
    );
    // eslint-disable-next-line
  }, [id_token]);

  return (
    <Card
      primary="Total Vehicles"
      secondary="total number of live vehicles"
      compareText="than yesterday"
      primaryCount={data.current_vehicles}
      // percentage={30}
      comparePercentage={(
        (data.current_vehicles / data.yesterday_total_vehicles) * 100 -
        100
      ).toFixed(2)}
      compareState={
        (
          (data.current_vehicles / data.yesterday_total_vehicles) * 100 -
          100
        ).toFixed(2) < 0
          ? false
          : true
      }
      href="/fleet/vehicles/live"
    />
  );
}
