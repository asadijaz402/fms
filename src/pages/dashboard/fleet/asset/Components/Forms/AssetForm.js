import React from 'react';
import {
  Grid,
  Box,
  TextField,
  Button,
  Backdrop,
  CircularProgress,
  Typography,
  Divider,
} from '@mui/material';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import useAssetForm from '../Hooks/useAssetForm';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import VehicleSearch from '../Dialogs/VehicleSearch';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const getSteps = ['Asset Details', 'Assign Vehicle/s'];

export default function AssetForm({ rowId, data, handleClose, step = 0 }) {
  const classes = useStyles();
  const { handleSubmit, handleChange, value, loading, error, activeStep } =
    useAssetForm(rowId, data, handleClose, step);

  const steps = [
    <form autoComplete="on" onSubmit={handleSubmit}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box pt={1}>
            <TextField
              fullWidth
              required
              autoFocus
              variant="outlined"
              label="Name"
              name="name"
              value={value.name}
              onChange={handleChange}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="yyyy-MM-dd"
                renderInput={(props) => <TextField fullWidth {...props} />}
                label="Bought Date	"
                name="bought_date"
                value={value.bought_date}
                required
                fullWidth
                onChange={(e) =>
                  handleChange(e, { type: 'date', name: 'bought_date' })
                }
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="yyyy-MM-dd"
                renderInput={(props) => <TextField fullWidth {...props} />}
                label="Expiry Date"
                name="expiry_date"
                value={value.expiry_date}
                required
                fullWidth
                onChange={(e) =>
                  handleChange(e, { type: 'date', name: 'expiry_date' })
                }
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      {error && (
        <Typography align="center" variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Box
        style={{
          mt: 3,
        }}
      >
        <Button
          fullWidth
          disabled={loading}
          size="large"
          variant="contained"
          color="primary"
          type="submit"
        >
          {rowId ? 'Update' : 'Add'}
        </Button>
      </Box>
    </form>,

    <VehicleSearch data={data} rowId={rowId} handleClose={handleClose} />,
  ];
  return (
    <div>
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
          </div>
        ) : loading ? (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <div>{steps[activeStep]}</div>
        )}
      </Box>
    </div>
  );
}
