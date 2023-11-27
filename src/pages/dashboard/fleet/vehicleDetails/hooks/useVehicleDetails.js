import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";

export default function useVehicleDetails() {
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  let id_token = useSelector((state) => state.user.id_token);

  const { vehicleId } = useParams();
  const dispatch = useDispatch();

  const getVehicleDetails = () => {
    setLoading(true);
    dispatch(getData(vehicleId, "vehicle", id_token, false)).then((res) => {
      if (res.status === 200) {
        setDetails(res.data);
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    if (vehicleId) {
      getVehicleDetails();
    }
    // eslint-disable-next-line
  }, [vehicleId]);

  return {
    details,
    loading,
  };
}
