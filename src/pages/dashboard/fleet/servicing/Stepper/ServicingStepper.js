import React from "react";
import { Stepper, Step, StepLabel, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import VehicleSearch from "../../../../../Components/Search/VehicleSearch";
import ServiceData from "../Forms/ServiceData";
import Garage from "../Forms/Garage";
import AdditionalServicing from "../Forms/AdditionalServicing";
import useServicingStepper from "./useServicingStepper";
import ServiceDate from "../Forms/ServiceDate";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    paddingTop: theme.spacing(2),
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

export default function ServicingStepper({
  rowId,
  handleClose,
  dataPassed,
  vehicleId,
  setId,
  ...props
}) {
  const classes = useStyles();

  const labels = [
    "Vehicle Select",
    "Service Date",
    "Service Data",
    "Garage Select",
    "Success",
  ];

  const {
    activeStep,
    value,
    handleChange,
    handleChangeCheck,
    handleNext,
    handleBack,
    isloading,
  } = useServicingStepper(rowId, dataPassed, vehicleId, setId);

  const steps = [
    <VehicleSearch
      setVehName={props.setVehName}
      handleChange={handleChange}
      handleNext={handleNext}
    />,
    <ServiceDate
      handleChange={handleChange}
      handleChangeCheck={handleChangeCheck}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
      rowId={rowId}
    />,
    <ServiceData
      handleChange={handleChange}
      handleChangeCheck={handleChangeCheck}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
      rowId={rowId}
    />,
    <Garage
      handleChange={handleChange}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
    />,
    <AdditionalServicing
      value={value}
      handleClose={handleClose}
      vehicleId={value.vehicle}
    />,
  ];

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
      <Box mt={6}>
        {isloading ? (
          <Box style={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <div>{steps[activeStep]}</div>
        )}
      </Box>
    </div>
  );
}
