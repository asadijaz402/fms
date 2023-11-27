import React, { useState } from 'react';
import { Grid, TextField, Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { listData } from '../../../../../slices/CustomSlices/actions/apiActions';

export default function AddVehicleOne({
  handleNext,
  values,
  handleChange,
  handleClickClose,
  handleSave,
  edit,
}) {
  const [error, setError] = useState(false);
  let id_token = localStorage.getItem('accessToken');

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      handleNext();
    } else {
      dispatch(
        listData(`vehicle/list/?search=${values.vehicle_reg_no}&`, id_token)
      ).then((res) => {
        if (res.data.count > 0) {
          setError(true);
        } else {
          setError(false);
          handleNext();
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            required
            autoFocus
            value={values.vehicle_reg_no}
            label="Registration No"
            name="vehicle_reg_no"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            error={!edit && error}
            helperText={!edit && error ? 'Vehicle already exists!' : ''}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            required
            label="V5C Number"
            name="v5c_number"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            value={values.v5c_number}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Maintenance Charges per day"
            name="cost_daily"
            variant="outlined"
            onChange={handleChange}
            type="number"
            fullWidth
            helperText="Cost / Maintainance charges of absolute 1 day."
            value={values.cost_daily}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Maintenance Charges 7 days"
            name="cost_seven_days"
            variant="outlined"
            onChange={handleChange}
            type="number"
            fullWidth
            helperText="Cost / Maintainance charges per week (7 days)."
            value={values.cost_seven_days}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Maintenance Charges 28 days"
            name="cost_twenty_eight_days"
            type="number"
            variant="outlined"
            helperText="Cost / Maintainance charges per month (28 days at least)."
            onChange={handleChange}
            fullWidth
            value={values.cost_twenty_eight_days}
          />
        </Grid>
      </Grid>

      <Box mt={2} mb={2} width={'100%'} display="flex">
        <Box flexGrow={1}>
          {values.id && (
            <Button variant="outlined" color="primary" onClick={handleSave}>
              Quick Save & Close
            </Button>
          )}
        </Box>
        <Box mr={1}>
          <Button onClick={handleClickClose}>Close</Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
      </Box>
    </form>
  );
}
