import React, { useEffect } from "react";
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@mui/material";
import VehicleSearch from "src/forms/VehicleSearch";
import ServiceData from "./ServiceData";
import "react-notifications-component/dist/theme.css";
import moment from "moment";
import useServicingStepper from "../Stepper/useServicingStepper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    padding: "15px",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
}));

export default function ServicingStepper(props) {
  const classes = useStyles();

  const labels = ["Vehicle Select", "Service Data"];

  const {
    activeStep,
    setActiveStep,
    value,
    setValue,
    handleChange,
    handleChangeCheck,
    handleNext,
    handleBack,
    isloading,
  } = useServicingStepper(props.method, props.dataPassed.id, props.handleClose);

  const steps = [
    <VehicleSearch
      setVehName={props.setVehName}
      handleChange={handleChange}
      handleNext={handleNext}
    />,
    <ServiceData
      handleChange={handleChange}
      handleChangeCheck={handleChangeCheck}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
      setValue={setValue}
    />,
  ];

  useEffect(() => {
    // props.resetApi();
    if (props.method === "put") {
      setValue({
        id: props.dataPassed.id,
        vehicle: props.dataPassed.vehicle.id,
        due_date: moment(props.dataPassed.due_date).format(
          "YYYY-MM-DDTHH:mm:ssZ"
        ),
        cost: props.dataPassed.cost,
        service_date: moment(props.dataPassed.service_date).format(
          "YYYY-MM-DDTHH:mm:ssZ"
        ),
        garage: props.dataPassed.garage,
        status: props.dataPassed.status,
        garage_manufacturer: props.dataPassed.manufacturers_servicing,
        service_number: props.dataPassed.service_number,
        oil_filter: props.dataPassed.oil_filter,
        oil_change: props.dataPassed.oil_change,
        fuel_filter: props.dataPassed.fuel_filter,
        air_filter: props.dataPassed.air_filter,
        pollen_filter: props.dataPassed.pollen_filter,
        additions_service: props.dataPassed.additions_service,
        method: props.method,
      });
      setActiveStep(1);
    } else {
      setValue({ method: props.method });
    }
    if (props.historyAddForm) {
      setValue({ vehicle: props.addId, method: "post" });
      setActiveStep(1);
    }
  }, []);

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {labels.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {isloading ? <CircularProgress /> : <div>{steps[activeStep]}</div>}
      </div>
    </div>
  );
}
