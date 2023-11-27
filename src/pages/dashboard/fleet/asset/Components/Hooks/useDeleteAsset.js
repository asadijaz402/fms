import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";

export default function useDeleteAsset(data) {
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
        };
      });
      setCallToAction({
        action: deleteData,
        url: "assets/" + data.id,
        err: "Error updating!",
        success: "asset Deleted.",
      });
    }
  }, [data]);

  const unAssigned = (id) => {
    dispatch(deleteData(id, "assets/assigned", idToken, false));
  };
  const handleSubmit = () => {
    setLoading(true);

    const data = new FormData();
    Object.keys(value).map((row) => {
      return data.append(row, value[row]);
    });

    dispatch(callToAction.action(false, callToAction.url, idToken, false))
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
    unAssigned,
    loading,
    open,
    setOpen,
  };
}
