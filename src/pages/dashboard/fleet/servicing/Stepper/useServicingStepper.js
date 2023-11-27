import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  createUpdateData,
  editUpdateData,
  getData,
} from "../../../../../slices/CustomSlices/actions/apiActions";
import moment from "moment";
import toast from "react-hot-toast";

export default function useServicingStepper(
  rowId,
  datapassed,
  vehicleId,
  setId
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
        service_date: moment(datapassed.service_date).format(
          "YYYY-MM-DDTHH:mm:ssZ"
        ),
      });
    } else {
      setValue({
        ...value,
        status: "Booked",
        due_date: moment().format("YYYY-MM-DDTHH:mm:ssZ"),
      });
    }
    // eslint-disable-next-line
  }, [rowId, datapassed]);

  const checkVehicleHistory = (vehicle_id) => {
    setloading(true);
    dispatch(
      getData(
        vehicle_id,
        "vehicle_accessories/service/history",
        id_token,
        false
      )
    ).then((res) => {
      if (
        res.data.filter(
          (d) => d.status === "Booked" || d.status === "Pending Validation"
        ).length !== 0
      ) {
        setId(
          res.data.filter(
            (d) => d.status === "Booked" || d.status === "Pending Validation"
          )[0].id
        );
      }
      setValue({
        ...value,
        ...res.data[0],
        status: "Booked",
        vehicle: vehicle_id,
      });
      setloading(false);
    });
  };

  useEffect(() => {
    if (vehicleId) {
      checkVehicleHistory(vehicleId);
      setValue({
        ...value,
        vehicle: vehicleId,
      });
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
          service_date: value.service_date ? value.service_date : new Date(),
          oil_filter: value.oil_filter ? value.oil_filter : false,
          oil_change: value.oil_change ? value.oil_change : false,
          fuel_filter: value.fuel_filter ? value.fuel_filter : false,
          pollen_filter: value.pollen_filter ? value.pollen_filter : false,
          air_filter: value.air_filter ? value.air_filter : false,
          additions_service: value.additions_service
            ? value.additions_service
            : "",
        };
        if (!rowId) {
          dispatch(
            createUpdateData(
              data,
              "vehicle_accessories/service",
              id_token,
              false
            )
          ).then((res) => {
            toast.success("Created successfully!");
            setloading(false);
          });
        } else {
          dispatch(
            editUpdateData(
              data,
              "vehicle_accessories/service",
              datapassed.id,
              id_token,
              false
            )
          ).then((res) => {
            toast.success("Updated successfully!");
            setloading(false);
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
