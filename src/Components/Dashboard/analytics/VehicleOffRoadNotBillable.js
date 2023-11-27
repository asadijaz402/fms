import React, { useEffect, useState } from "react";
import Card from "../../Card/Card";
import { listData } from "../../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";

export default function VehicleOffRoadNotBillable() {
  const [data, setData] = useState({});
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listData(
        "vehicle/dashboard/vehicle-offroad-not-billable",
        id_token,
        false
      )
    ).then((res) => {
      setData(res.data);
    });
    // eslint-disable-next-line
  }, [id_token]);

  return (
    <Card
      primary="Vehicles off Road not Billable"
      secondary="total vehicles not billable"
      // compareText="than yesterday"
      primaryCount={data.non_billable}
      percentage={Math.round(
        (data.non_billable /
          (data.total_vehicles - data.total_hired_vehicles)) *
          100
      )}
      // comparePercentage={(
      //   (data.hired_count / data.yesterday_count) * 100 -
      //   100
      // ).toFixed(2)}
      // compareState={true}
    />
  );
}
