import React, { useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";
import moment from "moment";
import { useState } from "react";
// import LocationDialog from "../Dialogs/LocationDialog";

export default function ServiceDate({
  value,
  handleChange,
  // handleChangeCheck,
  handleNext,
  handleBack,
  rowId,
}) {
  const [current_booking, setCurrent_booking] = useState(true);
  const handleChangeTime = (e, name) => {
    handleChange({
      target: {
        name: name,
        value: moment(e).format("YYYY-MM-DDTHH:mm:ssZ"),
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  useEffect(() => {
    if (rowId) {
      setCurrent_booking(false);
    }
    // eslint-disable-next-line
  }, [rowId]);

  useEffect(() => {
    if (current_booking) {
      handleChangeTime(Date.now(), "due_date");
    }
    // eslint-disable-next-line
  }, [current_booking]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={current_booking}
                    onChange={() => setCurrent_booking(!current_booking)}
                    name="current_booking"
                  />
                }
                label="Current Services"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {current_booking || value.status === "Completed" ? (
              <DateTimePicker
                renderInput={(props) => <TextField fullWidth {...props} />}
                fullWidth
                disabled
                label="Contact Date"
                name="due_date"
                value={value.due_date}
                onChange={(e) => handleChangeTime(e, "due_date")}
                inputProps={{
                  readOnly: value.status === "Completed",
                }}
                readOnly
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            ) : (
              <DateTimePicker
                renderInput={(props) => <TextField fullWidth {...props} />}
                fullWidth
                label="Contact Date"
                name="due_date"
                value={value.due_date}
                onChange={(e) => handleChangeTime(e, "due_date")}
                inputProps={{
                  readOnly: value.status === "Completed",
                }}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            )}
          </LocalizationProvider>
        </Grid>
        <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            {value.status === "Completed" ? (
              <DateTimePicker
                renderInput={(props) => <TextField fullWidth {...props} />}
                label="Agreed Date"
                name="service_date"
                value={value.service_date}
                required
                disabled
                fullWidth
                onChange={(e) => handleChangeTime(e, "service_date")}
                inputProps={{
                  readOnly: value.status === "Completed",
                }}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            ) : (
              <DateTimePicker
                renderInput={(props) => <TextField fullWidth {...props} />}
                label="Agreed Date"
                name="service_date"
                value={value.service_date}
                required
                fullWidth
                onChange={(e) => handleChangeTime(e, "service_date")}
                inputProps={{
                  readOnly: value.status === "Completed",
                }}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            )}
          </LocalizationProvider>
        </Grid>
      </Grid>
      <div style={{ marginTop: "50px", textAlign: "right" }}>
        <Button
          disabled={rowId || value.status === "Completed"}
          onClick={() => handleBack()}
          style={{ marginRight: "8px" }}
        >
          Back
        </Button>
        <Button
          disabled={!value.due_date}
          variant="contained"
          color="primary"
          type="submit"
        >
          Next
        </Button>
      </div>
    </form>
  );
}
