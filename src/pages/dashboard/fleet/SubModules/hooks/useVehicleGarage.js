import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUpdateData,
  putData,
} from "../../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";
import useBuySlotDialog from "../../../../../Components/payment/hooks/useBuySlotDialog";

export default function useVehicleGarageForm(
  id = false,
  handleClickClose,
  data
) {
  const { setBuySlotDialogOpen, setType } = useBuySlotDialog();
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const idToken = useSelector((state) => state.user.id_token);
  const [callToAction, setCallToAction] = useState({
    action: createUpdateData,
    url: "garages",
    err: "Error creating garage.",
    success: "Garage created.",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      console.log(data);
      setValue((value) => {
        return {
          ...value,
          ...data,
        };
      });
      setCallToAction({
        action: putData,
        url: "garages",
        err: "Error updating!",
        success: "Garage Updated.",
      });
    }
  }, [id, data]);

  const handleChange = (e) => {
    setValue((value) => {
      return { ...value, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(value).map((row) => {
      return data.append(row, value[row]);
    });

    dispatch(callToAction.action(data, callToAction.url, idToken, false))
      .then((res) => {
        if (res.status === 200) {
          toast.success(callToAction.success);
          handleClickClose();
        } else {
          if (res?.response?.status === 402) {
            toast.error("Plan limit reached.");
            setType("plan");
            setBuySlotDialogOpen(true);
            handleClickClose();
          }
          toast.error(callToAction.err);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(callToAction.err);
        toast.error(callToAction.err);
        setLoading(false);
      });
  };

  return {
    handleSubmit,
    handleChange,
    value,
    loading,
    error,
  };
}
