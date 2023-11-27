import React from "react";
import useVORGarageStepper from "./useVORGarageStepper";
import { CircularProgress, Step, StepLabel, Stepper, Box } from "@mui/material";
import GarageDetailsForm from "../Forms/GarageDetailsForm";
import VehicleSearch from "../Forms/VehicleSearch";

const stepLabels = ["Garage Details", "Parked Vehicles"];

export default function VORGarage({
  handleClose,
  rowId = false,
  viewVehicles,
}) {
  const { value, handleChange, activeStep, handleNext, handleBack, loading } =
    useVORGarageStepper(rowId, handleClose, viewVehicles);

  const steps = [
    <GarageDetailsForm
      value={value}
      handleChange={handleChange}
      handleNext={handleNext}
      handleClickClose={handleClose}
    />,
    <VehicleSearch
      handleChange={handleChange}
      value={value}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
  ];

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepLabels.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {loading ? (
        <Box width="100%" style={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box mt={2}>{steps[activeStep]}</Box>
      )}
    </>
  );
}
