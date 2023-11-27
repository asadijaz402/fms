import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUpdateData,
  editUpdateData,
  getData,
  snackOpen,
} from "../../../../../../../slices/CustomSlices/actions/apiActions";
import moment from "moment";
import toast from "react-hot-toast";

export default function useServicingStepper(
  rowId,
  datapassed,
  vehicleId,
  setId,
  handleClose
) {
  const [value, setValue] = useState({});
  const [isloading, setloading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (rowId && Object.keys(datapassed).length !== 0) {
      setActiveStep(1);
      setValue({
        ...datapassed,
        vehicle: datapassed.vehicle.id,
        due_date: moment(datapassed.due_date).format("YYYY-MM-DDTHH:mm:ssZ"),
        date_time_completed: moment(datapassed.date_time_completed).format(
          "YYYY-MM-DDTHH:mm:ssZ"
        ),
      });
    } else {
      setValue({
        ...value,
        status: "Booked",
      });
    }
    // eslint-disable-next-line
  }, [rowId, datapassed]);

  const checkVehicleHistory = (vehicle_id) => {
    setloading(true);
    dispatch(
      getData(vehicle_id, "vehicle_accessories/tyres/history", id_token, false)
    ).then((res) => {
      if (res.data.filter((d) => d.status !== "Completed").length !== 0) {
        setId(res.data.filter((d) => d.status !== "Completed")[0].id);
      }
      setloading(false);
    });
  };

  useEffect(() => {
    if (vehicleId) {
      checkVehicleHistory(vehicleId);
      setValue({ ...value, vehicle: vehicleId });
      setActiveStep(1);
    }
    // eslint-disable-next-line
  }, [vehicleId]);

  useEffect(() => {
    if (!rowId && value.vehicle) {
      checkVehicleHistory(value.vehicle);
      setActiveStep(1);
    }
    // eslint-disable-next-line
  }, [value.vehicle]);

  useEffect(() => {
    switch (activeStep) {
      case 4:
        setloading(true);
        const data = {
          ...value,
          due_date: value.due_date ? value.due_date : new Date(),
          date_time_completed: value.date_time_completed
            ? value.date_time_completed
            : new Date(),
          front_left: value.front_left ? value.front_left : false,
          front_right: value.front_right ? value.front_right : false,
          rear_left: value.rear_left ? value.rear_left : false,
          rear_right: value.rear_right ? value.rear_right : false,
        };
        if (!rowId) {
          dispatch(
            createUpdateData(data, "vehicle_accessories/tyres", id_token, false)
          ).then((res) => {
            setloading(false);
            setValue({});
            handleClose();
            dispatch(snackOpen(true, "Added tyre service!", "success", true));
            toast.success("Created successfully!");
          });
        } else {
          dispatch(
            editUpdateData(
              data,
              "vehicle_accessories/tyres",
              datapassed.id,
              id_token,
              false
            )
          ).then((res) => {
            setloading(false);
            setValue({});
            handleClose();
            dispatch(snackOpen(true, "Updated tyre service!", "success", true));
            toast.success("Updated successfully!");
          });
        }
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [activeStep]);

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleChangeCheck = (event) => {
    setValue({
      ...value,
      [event.target.name]: event.target.checked,
    });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return {
    activeStep,
    value,
    handleChange,
    handleChangeCheck,
    handleNext,
    handleBack,
    isloading,
    setloading,
  };
}
