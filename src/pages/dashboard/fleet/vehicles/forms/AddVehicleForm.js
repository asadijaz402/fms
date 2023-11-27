import React from 'react';
import { Stepper, Step, StepLabel, CircularProgress, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddVehOne from './AddVehOne';
import Progress from './Progress';
import AddVehTwo from './AddVehTwo';
import AddVehThree from './AddVehThree';
import AddVehFour from './AddVehFour';
import useAddVehicleForm from './useAddVehicleForm';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'auto',
    paddingTop: theme.spacing(4),
  },
}));

export default function AddVehicleForm({ handleClickClose, id }) {
  const classes = useStyles();
  const {
    activeStep,
    handleNext,
    handleBack,
    values,
    handleChange,
    loading,
    handleSave,
  } = useAddVehicleForm(handleClickClose, id);

  const steps = [
    <AddVehOne
      handleNext={handleNext}
      values={values}
      edit={id ? true : false}
      handleChange={handleChange}
      handleClickClose={handleClickClose}
      handleSave={handleSave}
    />,
    <AddVehTwo
      values={values}
      handleChange={handleChange}
      handleBack={handleBack}
      handleNext={handleNext}
      handleSave={handleSave}
    />,
    <AddVehThree
      handleBack={handleBack}
      values={values}
      handleChange={handleChange}
      handleNext={handleNext}
      handleSave={handleSave}
    />,
    <AddVehFour
      handleBack={handleBack}
      values={values}
      handleChange={handleChange}
      handleNext={handleNext}
      handleSave={handleSave}
    />,
    <Progress />,
  ];

  const stepLabels = [
    'Vehicle Details',
    'Vehicle Types',
    'Supplier',
    'Tracker',
    'Submitting Data',
  ];

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepLabels.map((label, index) => {
          return (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === 4 || loading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <Box mt={8}>{steps[activeStep]}</Box>
      )}
    </div>
  );
}
