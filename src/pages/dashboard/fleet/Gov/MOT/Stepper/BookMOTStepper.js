import { CircularProgress, Step, StepLabel, Stepper, Box } from "@mui/material";
import React from "react";
import Garage from "../Forms/Garage";
import BookingDateTime from "../Forms/BookingDateTime";
import useBookMOTStepper from "./useBookMOTStepper";
import EmployeeOrCustomer from "../Forms/EmployeeOrCustomer";
import Review from "../Forms/Review";

const stepLabels = [
  "Date & Time",
  "Person Responsible",
  "Select Garage",
  "Review",
];

export default function BookMOTStepper({ handleClose, rowId }) {
  const { value, handleChange, activeStep, loading, handleNext, handleBack } =
    useBookMOTStepper(rowId, handleClose);

  const steps = [
    <BookingDateTime
      value={value}
      handleNext={handleNext}
      onChange={handleChange}
    />,
    <EmployeeOrCustomer
      handleNext={handleNext}
      onChange={handleChange}
      handleBack={handleBack}
      value={value}
    />,
    <Garage
      handleNext={handleNext}
      onChange={handleChange}
      value={value}
      handleBack={handleBack}
    />,
    <Review handleClose={handleClose} loading={loading} />,
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
      <div style={{ textAlign: "center" }}>
        <Box mt={4}>{loading ? <CircularProgress /> : steps[activeStep]}</Box>
      </div>
    </>
  );
}
