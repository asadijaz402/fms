import { useState, useEffect } from "react";
import { getData } from "../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function usePayment() {
  const [plan, setPlan] = useState({});
  const [plans, setPlans] = useState([]);
  const [value, setValue] = useState({ vehicle_count: 10 });
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const id_token = useSelector((state) => state.user.id_token);
  const { user } = useAuth();
  const { search } = useLocation();

  const params = new URLSearchParams(search);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (Object.keys(plan).length === 0) {
      setLoading(true);
      dispatch(getData(params.get("plan"), "business", id_token, false)).then(
        (res) => {
          setPlan(res.data);
          setLoading(false);
        }
      );
    }
    // eslint-disable-next-line
  }, [params]);

  useEffect(() => {
    dispatch(getData("all", "business", id_token, false)).then((res) => {
      setPlans(res.data);
    });
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  return {
    loading,
    plan,
    plans,
    value,
    handleChange,
    handleClose,
    open,
    anchorEl,
    handleClick,
    user,
  };
}
