import React, { useEffect, useState } from "react";
import Card from "../../Card/Card";
import { listData } from "../../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";

export default function HiredVehicles() {
  const [data, setData] = useState({});
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listData("hiring/dashboard/rental-history", id_token, false)).then(
      (res) => {
        setData(res.data);
      }
    );
    // eslint-disable-next-line
  }, [id_token]);

  return (
    <Card
      primary="Hired Vehicles"
      secondary="total vehicles on hire"
      compareText="than yesterday"
      primaryCount={data.hired_count}
      percentage={Math.round((data.hired_count / data.total_count) * 100)}
      comparePercentage={(
        (data.hired_count / data.yesterday_count) * 100 -
        100
      ).toFixed(2)}
      compareState={
        ((data.hired_count / data.yesterday_count) * 100 - 100).toFixed(2) < 0
          ? false
          : true
      }
      href="/fleet/vehicles/onhire"
    />
  );
}
