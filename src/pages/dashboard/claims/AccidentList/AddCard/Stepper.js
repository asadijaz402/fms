import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import VehicleSearch from "./VehicleSearch";
import Booking from "./Booking";
import AccidentInfo from "./AccidentInfo";
import useAddCard from "./useAddCard";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getSteps = [
  "Select Vehicle",
  "Confirm Booking and Customer",
  "Details",
  "Finish",
];

export default function HorizontalLabelPositionBelowStepper({ handleClose }) {
  const classes = useStyles();
  const {
    loading,
    value,
    handleNext,
    handleBack,
    handleChange,
    handleReset,
    activeStep,
    setValue,
  } = useAddCard(handleClose);

  const steps = [
    <div style={{ textAlign: "center" }}>
      <VehicleSearch handleChange={handleChange} handleNext={handleNext} />
    </div>,
    <Booking
      vehicle_id={value.vehicle}
      setValue={setValue}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <AccidentInfo
      handleChange={handleChange}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
    />,
  ];

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {getSteps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box pt={4}>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <div>{steps[activeStep]}</div>
        )}
      </Box>
    </div>
  );
}
