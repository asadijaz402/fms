import React from "react";
import { Stepper, Step, StepLabel, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import VehicleSearch from "../../../../../../../Components/Search/VehicleSearch";
import TyreData from "../Forms/TyreData";
import Garage from "../Forms/Garage";
import ServiceBy from "../Forms/ServiceBy";
import useTyreStepper from "./useTyreStepper";
import TyreDate from "../Forms/TyreDate";

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
    "Tyre Service Date",
    "Tyre Service Data",
    "Garage Select",
    "Service by",
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
  } = useTyreStepper(rowId, dataPassed, vehicleId, setId, handleClose);

  const steps = [
    <VehicleSearch
      setVehName={props.setVehName}
      handleChange={handleChange}
      handleNext={handleNext}
    />,
    
    <TyreDate
      handleChange={handleChange}
      handleChangeCheck={handleChangeCheck}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
      rowId={rowId}
    />,

    <TyreData
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
    <ServiceBy
      handleChange={handleChange}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
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
      <Box mt={4} mb={2} style={{ textAlign: "center" }}>
        {isloading ? <CircularProgress /> : <div>{steps[activeStep]}</div>}
      </Box>
    </div>
  );
}
