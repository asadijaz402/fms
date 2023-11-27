import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  createUpdateData,
  putData,
} from "../../../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";

export default function useAssetForm(rowId, data, handleClose, step) {
  const [activeStep, setActiveStep] = useState(step);

  const [value, setValue] = useState({
    expiry_date: moment(Date.now()).format("YYYY-MM-DD"),
    bought_date: moment(Date.now()).format("YYYY-MM-DD"),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const idToken = useSelector((state) => state.user.id_token);
  const [callToAction, setCallToAction] = useState({
    action: createUpdateData,
    url: "assets",
    err: "Error creating Asset.",
    success: "Asset created.",
  });
  const [vehicle, setVehicle] = useState();
  const [asset, setAsset] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (rowId) {
      setValue((value) => {
        return {
          ...value,
          ...data,
        };
      });
      setCallToAction({
        action: putData,
        url: "assets/" + rowId,
        err: "Error updating!",
        success: "Asset Updated.",
      });
    }
  }, [rowId, data]);
  const handleChange = (e, date = false) => {
    if (date) {
      setValue((value) => {
        return {
          ...value,
          [date.name]: moment(e).format("YYYY-MM-DD"),
        };
      });
    } else {
      setValue((value) => {
        return { ...value, [e.target.name]: e.target.value };
      });
    }
  };

  const assignedVehicle = (id = false) => {
    if (!rowId) {
      dispatch(
        createUpdateData(
          { asset: asset, vehicle_ids: id ? [id] : vehicle },
          `assets/assigned`,
          idToken,
          false
        )
      ).then((res) => handleClose());
    } else {
      dispatch(
        createUpdateData(
          {
            asset: typeof rowId === "object" ? rowId : [rowId],
            vehicle_ids: typeof vehicle === "object" ? vehicle : [vehicle],
          },
          `assets/assigned`,
          idToken,
          false
        )
      ).then((res) => handleClose());
    }
  };
  const vehicleChange = (value) => {
    setVehicle(value.map((data) => data.value));
  };

  const AssetChange = (value) => {
    setAsset(value.map((data) => data.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setActiveStep(1);

    dispatch(callToAction.action(value, callToAction.url, idToken, false))
      .then((res) => {
        if (res?.response?.status === 402) {
          toast.error(
            res?.response?.data?.msg
              ? res?.response?.data?.msg
              : callToAction.err
          );
        } else {
          setAsset(res.id);
          toast.success(callToAction.success);
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
    activeStep,
    handleChange,
    value,
    loading,
    error,
    vehicleChange,
    vehicle,
    asset,
    setAsset,
    AssetChange,
    assignedVehicle,
  };
}
