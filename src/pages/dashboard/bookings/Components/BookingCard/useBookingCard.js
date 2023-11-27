import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";

export default function useBookingCard(rowId) {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState([]);
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (rowId) {
      setLoading(true);
      dispatch(getData(rowId, "hiring/bookings", id_token, false)).then(
        (res) => {
          setValue(res.data);
          setLoading(false);
        }
      );
    }
    // eslint-disable-next-line
  }, [rowId]);

  return {
    loading,
    value,
  };
}
