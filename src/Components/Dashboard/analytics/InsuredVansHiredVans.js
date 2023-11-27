import React, { useEffect, useState } from "react";
import Card from "../../Card/Card";
import { listData } from "../../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";

export default function InsuredVansHiredVans() {
  const [data, setData] = useState({});
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listData("hiring/dashboard/insured-hired-vans", id_token, false)
    ).then((res) => {
      setData(res.data);
    });
    // eslint-disable-next-line
  }, [id_token]);

  return (
    <Card
      primary='Vans'
      secondary='total insured vs hired vans'
      // compareText="than yesterday"
      primaryCount={data.insured + " / " + data.vans_hired}
      percentage={Math.round((data.insured / data.vans_hired) * 100)}
      // comparePercentage={}
      compareState={true}
    />
  );
}
