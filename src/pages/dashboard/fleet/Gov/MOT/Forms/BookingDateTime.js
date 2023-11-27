import React, { useState } from "react";
import { Button, useTheme, TextField } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

export default function BookingDateTime({ value, onChange, handleNext }) {
  const [selectedDate, handleDateChange] = useState(
    value.test_date ? value.test_date : new Date()
  );
  const theme = useTheme();

  const onSubmit = (e) => {
    e.preventDefault();
    onChange({
      target: {
        name: "test_date",
        value: selectedDate,
      },
    });

    handleNext();
  };

  return (
    <form onSubmit={onSubmit}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField required fullWidth {...props} />}
          label="Booking Date and Time"
          required
          name="due_date"
          value={selectedDate}
          onChange={handleDateChange}
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
      </LocalizationProvider>
      <div style={{ marginTop: theme.spacing(2), textAlign: "right" }}>
        <Button disabled style={{ marginRight: theme.spacing(1) }}>
          Back
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
