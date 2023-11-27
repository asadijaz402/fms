import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  createUpdateData,
  editUpdateData,
} from "../../../../../../../slices/CustomSlices/actions/apiActions";

export default function useVORGarageStepper(rowId, handleClose, viewVehicles) {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiceStep] = useState(0);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (viewVehicles) {
      setActiceStep(1);
    }
    // eslint-disable-next-line
  }, [viewVehicles]);

  useEffect(() => {
    if (rowId) {
      setLoading(true);
      dispatch(getData(rowId, "vehicle/vortype", id_token, false)).then(
        (res) => {
          setValue(res.data);
          setLoading(false);
        }
      );
    }
    // eslint-disable-next-line
  }, [rowId]);

  const handleNext = () => {
    setActiceStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiceStep(activeStep - 1);
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (activeStep === 2) {
      setLoading(true);
      let data = {
        ...value,
        vehicles: value.vehicles && value.vehicles.map((val) => val.id),
      };
      if (rowId) {
        dispatch(
          editUpdateData(data, "vehicle/vortype", rowId, id_token, false)
        ).then((res) => {
          handleClose();
          setLoading(false);
        });
      } else {
        dispatch(
          createUpdateData(data, "vehicle/vortype", id_token, false)
        ).then((res) => {
          handleClose();
          setLoading(false);
        });
      }
    }
    // eslint-disable-next-line
  }, [activeStep]);

  return {
    value,
    handleChange,
    activeStep,
    handleNext,
    handleBack,
    loading,
  };
}
