import React from "react";
import VehicleDetailsForm from "../Forms/VehicleDetailsForm";
import usePrecheckStepper from "./usePrecheckStepper";
import { CircularProgress, Box, Stepper, Step, StepLabel } from "@mui/material";
import PreRentInspectionsForm from "../Forms/PreRentInspectionsForm";
import DamageForm from "../Forms/DamageForm";

const stepLabels = ["Details", "Inspection", "Damages"];

export default function PrecheckStepper({
  rowId,
  handleClose,
  vehicleId,
  tableMeta,
}) {
  const {
    value,
    onChange,
    handleDateChange,
    loading,
    activeStep,
    handleNext,
    handleBack,
  } = usePrecheckStepper(handleClose, vehicleId, tableMeta, rowId);

  const steps = [
    <VehicleDetailsForm
      rowId={rowId}
      value={value}
      onChange={onChange}
      handleNext={handleNext}
      handleDateChange={handleDateChange}
    />,
    <PreRentInspectionsForm
      rowId={rowId}
      value={value}
      onChange={onChange}
      handleNext={handleNext}
      handleBack={handleBack}
    />,
    <DamageForm
      value={value}
      rowId={rowId}
      onChange={onChange}
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
      <Box width="100%" style={{ textAlign: "center" }}>
        {loading ? <CircularProgress /> : steps[activeStep]}
      </Box>
    </>
  );
}
