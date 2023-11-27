import React from 'react';
import { Box, CircularProgress, Step, StepLabel, Stepper } from '@mui/material';
import useBookingStepper from './useBookingStepper';
import Lead from './Forms/Lead';
import DateRangePicker from './Forms/DateRangePicker';
import CustomerForm from './Forms/CustomerForm';
import SelectRentVehicle from './Forms/SelectRentVehicle';
import DeliveryForm from './Forms/DeliveryForm';
import Success from './Forms/Success';

const stepLabels = ['Lead?', 'Dates', 'Vehicle', 'Customer', 'Other'];

export default function BookingStepper({ handleClose, data = false }) {
  const {
    loading,
    activeStep,
    handleNext,
    handleBack,
    onChange,
    value,
    success,
  } = useBookingStepper(data);

  const steps = [
    <Lead onChange={onChange} handleNext={handleNext} />,
    <DateRangePicker
      onChange={onChange}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
    />,
    <SelectRentVehicle
      onChange={onChange}
      handleBack={handleBack}
      handleNext={handleNext}
      value={value}
    />,
    <CustomerForm
      onChange={onChange}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
    />,
    <DeliveryForm
      onChange={onChange}
      handleNext={handleNext}
      handleBack={handleBack}
      value={value}
    />,
    <Success success={success} handleClose={handleClose} />,
  ];

  return (
    <Box pt={2}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepLabels.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Box width='100%' mt={4} style={{ textAlign: 'center' }}>
        {loading ? <CircularProgress /> : steps[activeStep]}
      </Box>
    </Box>
  );
}
