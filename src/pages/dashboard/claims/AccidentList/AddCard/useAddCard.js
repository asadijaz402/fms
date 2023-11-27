import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateData } from "../../../../../slices/CustomSlices/actions/apiActions";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
export default function useAddCard(handleClose) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState({
    incident_date_time: new Date(),
  });
  let id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  const postData = () => {
    let data = {
      vehicle: value.vehicle.id ? value.vehicle.id : value.vehicle,
      accident: "/claims/Breakdown/table" === location.pathname ? false : true,
      state: "Open for Action",
      notes: {
        notes: value.notes,
        members: [],
        comments: [],
        checklist: [],
      },
      booking: value.id ? value.id : null,
      driver_name: value.driver_name,
      date: value.incident_date_time,
      location: value.location,
      customer_opinion: value.customer_opinion,
      damages: "",
      type: value.type,
    };
    dispatch(createUpdateData(data, "claims/boa", id_token, false)).then(
      (res) => {
        setLoading(false);
        toast.success("Accident entry made.");
        handleClose();
      }
    );
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep === 2) {
      postData();
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return {
    loading,
    value,
    handleNext,
    handleBack,
    handleChange,
    handleReset,
    activeStep,
    setValue,
  };
}
