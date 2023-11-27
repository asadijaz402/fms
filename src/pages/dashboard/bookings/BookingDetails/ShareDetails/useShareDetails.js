import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";
// import toast from 'react-hot-toast';

export default function useBookingDetails() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  let { bookingId } = useParams();

  const fetchData = () => {
    setLoading(true);
    dispatch(getData(bookingId, "hiring/bookings/share", id_token, false)).then(
      (res) => {
        setData(res.data);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (bookingId) {
      setLoading(true);
      fetchData();
    }
    // eslint-disable-next-line
  }, [bookingId]);

  return {
    bookingId,
    loading,
    data,
  };
}
