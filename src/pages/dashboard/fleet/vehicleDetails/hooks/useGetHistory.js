import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";

export default function useGetServiceHistory(details, type) {
  const history_type = {
    service_history: "vehicle_accessories/service/history",
    tyre_service_history: "vehicle_accessories/tyres/history",
    brake_service_history: "vehicle_accessories/brakes/history",
    vor_history: "vehicle/vorhistory",
    precheck_history: "vehicle_accessories/precheck",
  };

  const [data, setData] = useState([]);

  const { tabName } = useParams();

  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const fetchData = () => {
    dispatch(getData(details.id, history_type[type], id_token, false)).then(
      (res) => {
        if (res !== undefined && res.data.length !== 0) {
          setData(res.data);
        }
      }
    );
  };

  useEffect(() => {
    if (tabName === type) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [tabName]);

  return {
    data,
  };
}
