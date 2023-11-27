import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { putData } from "../../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";

export default function useDeleteCustomer(data) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const idToken = useSelector((state) => state.user.id_token);
  const [callToAction, setCallToAction] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setValue((value) => {
        return {
          ...value,
          ...data,
          kashflow_id: data.kashflow_id?.id,
          banned: !data.banned,
        };
      });
      setCallToAction({
        action: putData,
        url: "hiring/customer/" + data.id,
        err: "Error updating!",
        success: "Customer Updated.",
      });
    }
  }, [data]);

  const handleSubmit = () => {
    setLoading(true);

    const data = new FormData();
    Object.keys(value).map((row) => {
      return data.append(row, value[row]);
    });

    dispatch(callToAction.action(data, callToAction.url, idToken, false))
      .then((res) => {
        if (res.status === 200) {
          toast.success(callToAction.success);
          setOpen(false);
        } else {
          toast.error(callToAction.err);
        }
        setLoading(false);
      })
      .catch((err) => {
        toast.error(callToAction.err);
        setLoading(false);
      });
  };

  return {
    handleSubmit,
    loading,
    open,
    setOpen,
  };
}
