import React from "react";
import { makeStyles, TextField, Button, Grid } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

export default function BasicTextFields({
  handleBack,
  handleNext,
  handleChange,
}) {
  const classes = useStyles();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleNext();
      }}
      className={classes.root}
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            name="driver_name"
            id="outlined-basic"
            label="Driver Name"
            fullWidth
            required
            onChange={(e) => {
              handleChange(e);
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <TextField
            name="type"
            id="outlined-basic"
            label="Type of Accident/Breakdown"
            required
            fullWidth
            onChange={(e) => {
              handleChange(e);
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField required fullWidth {...props} />
              )}
              label="Accident Date and Time"
              name="incident_date_time"
              required
              onChange={(e) =>
                handleChange({
                  target: { name: "incident_date_time", value: e },
                })
              }
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
        <Grid item xs={12}>
          <TextField
            name="location"
            id="outlined-basic"
            required
            label="Location"
            multiline
            onChange={(e) => {
              handleChange(e);
            }}
            rows={3}
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            onChange={(e) => {
              handleChange(e);
            }}
            name="notes"
            id="outlined-basic"
            multiline
            rows={4}
            label="Notes"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            onChange={(e) => {
              handleChange(e);
            }}
            name="customer_opinion"
            id="outlined-basic"
            multiline
            rows={4}
            label="Customer Opinion"
            fullWidth
            variant="outlined"
          />
        </Grid>
        <Grid style={{ textAlign: "right" }} item xs={12}>
          <div>
            <Button onClick={handleBack}>Back</Button>
            <Button variant="contained" type="submit" color="primary">
              Finish
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
