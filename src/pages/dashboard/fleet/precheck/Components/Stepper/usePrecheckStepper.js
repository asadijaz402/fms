import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUpdateData,
  getData,
} from "../../../../../../slices/CustomSlices/actions/apiActions";

export default function usePrecheckStepper(
  handleClose,
  vehicleId,
  tableMeta,
  rowId
) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (rowId) {
      setLoading(true);
      dispatch(
        getData(vehicleId, "vehicle_accessories/precheck", id_token, false)
      ).then((res) => {
        setValue({ ...res.data.filter((row) => row.id === rowId)[0] });
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [rowId]);

  useEffect(() => {
    if (vehicleId) {
      setLoading(true);
      dispatch(
        getData(vehicleId, "vehicle_accessories/precheck", id_token, false)
      ).then((res) => {
        if (res.data.length !== 0) {
          setValue({
            ...value,
            ...res.data[0],
            vehicle: vehicleId,
            vehicle_reg_no: tableMeta.vehicle_reg_no,
          });
          setLoading(false);
        } else {
          setValue({
            ...value,
            vehicle: vehicleId,
            vehicle_reg_no: tableMeta.vehicle_reg_no,
          });
          setLoading(false);
        }
      });
    }
    // eslint-disable-next-line
  }, [vehicleId]);

  const onChange = (e) => {
    if (!rowId) {
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleDateChange = (name) => (value) => {
    if (!rowId) {
      setValue({ ...value, [name]: value });
    }
  };

  useEffect(() => {
    if (activeStep === 3) {
      setLoading(true);
      dispatch(
        createUpdateData(value, "vehicle_accessories/precheck", id_token, false)
      ).then((res) => {
        setLoading(false);
        handleClose();
      });
    }
    // eslint-disable-next-line
  }, [activeStep]);

  return {
    value,
    onChange,
    handleDateChange,
    loading,
    activeStep,
    handleNext,
    handleBack,
  };
}
