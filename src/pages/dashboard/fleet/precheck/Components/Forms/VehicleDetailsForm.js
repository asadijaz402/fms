import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Slider,
  Button,
  TextField,
  Box,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const marks = [
  {
    value: 0,
    label: "E",
  },
  {
    value: 100,
    label: "F",
  },
];

export default function VehicleDetailsForm({
  value,
  handleNext,
  onChange,
  handleDateChange,
  rowId,
}) {
  useEffect(() => {
    let new_date = new Date();
    new_date.setDate(new_date.getDate() + 3);
    onChange({
      target: {
        name: "due_date",
        value: new_date,
      },
    });
    // eslint-disable-next-line
  }, []);

  const onHandleChangeSlider = (name) => (event, newValue) => {
    onChange({
      target: {
        name: name,
        value: newValue,
      },
    });
  };

  const valuetext = (value) => {
    return `${value}`;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    handleNext();
  };

  return (
    <form onSubmit={onSubmit}>
      <Box mt={2}>
        <Grid container item spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              value={value.vehicle_reg_no}
              label="Selected Vehicle"
              variant="outlined"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField required fullWidth {...props} />
                )}
                label="Due Date"
                required
                name="due_date"
                value={value.due_date}
                onChange={handleDateChange("due_date")}
                inputProps={{
                  readOnly: rowId,
                }}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box p={2}>
              <Typography id="discrete-slider-always" gutterBottom>
                Fuel
              </Typography>
              <Slider
                onChange={onHandleChangeSlider("fuel")}
                defaultValue={value.fuel}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={marks}
                valueLabelDisplay="on"
                InputProps={{
                  readOnly: rowId,
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box p={2}>
              <Typography id="discrete-slider-always" gutterBottom>
                AdBlue
              </Typography>
              <Slider
                onChange={onHandleChangeSlider("adblue")}
                defaultValue={value.adblue}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-always"
                step={1}
                marks={marks}
                InputProps={{
                  readOnly: rowId,
                }}
                valueLabelDisplay="on"
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              type="number"
              value={value.milage}
              fullWidth
              onChange={onChange}
              label="Mileage Out"
              name="milage"
              InputProps={{
                readOnly: rowId,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              value={value.fuel_type}
              fullWidth
              onChange={onChange}
              label="Fuel Type"
              name="fuel_type"
              InputProps={{
                readOnly: rowId,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              value={value.supplier_reference}
              fullWidth
              onChange={onChange}
              label="Supplier Reference"
              InputProps={{
                readOnly: rowId,
              }}
              name="supplier_reference"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextField
              value={value.location}
              fullWidth
              onChange={onChange}
              InputProps={{
                readOnly: rowId,
              }}
              name="location"
              label="Location"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        mt={4}
        mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
        <Box mr={1}>
          <Button disabled>Back</Button>
        </Box>
      </Box>
    </form>
  );
}
