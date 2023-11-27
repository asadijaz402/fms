import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUpdateData } from "../../../../../../slices/CustomSlices/actions/apiActions";

export default function useBookMOTSteppe(rowId, handleClose) {
  const [value, setValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  useEffect(() => {
    if (activeStep === 3) {
      setLoading(true);
      const data = {
        ...value,
        test_booked: true,
        booked_by: 1,
        status: "Pending Validation",
      };
      dispatch(
        editUpdateData(data, "vehicle_accessories/MOT", rowId, id_token, false)
      ).then((res) => {
        setLoading(false);
        handleClose();
      });
    }
    // eslint-disable-next-line
  }, [activeStep]);

  return {
    value,
    handleChange,
    activeStep,
    loading,
    handleNext,
    handleBack,
  };
}
