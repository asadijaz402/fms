import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { listData } from "../../../../slices/CustomSlices/actions/apiActions";

export default function useListData() {
  const [loading, setLoading] = useState(false);
  const idToken = useSelector((state) => state.user.id_token);
  let resetList = useSelector((state) => state.api.resetList);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch(listData("garages/list", idToken, false)).then((res) => {
      if (res.data.results.length === 0) {
        setOpen(true);
      }
    });
    setLoading(false);
    // eslint-disable-next-line
  }, [location, resetList]);

  return {
    loading,
    setOpen,
    open,
  };
}
