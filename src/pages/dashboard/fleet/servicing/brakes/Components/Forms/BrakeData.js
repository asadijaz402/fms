import React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import moment from "moment";

export default function BrakeData({
  value,
  handleChange,
  handleChangeCheck,
  handleNext,
  handleBack,
  rowId,
}) {
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

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  value.front_left ? (
                    value.status === "Completed" ? (
                      <Checkbox disabled checked={true} name="front_left" />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="front_left"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="front_left" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="front_left"
                    />
                  )
                }
                label="Front Left"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  value.front_right ? (
                    value.status === "Completed" ? (
                      <Checkbox disabled checked={true} name="front_right" />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="front_right"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="front_right" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="front_right"
                    />
                  )
                }
                label="Front Right"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.rear_left ? (
                    value.status === "Completed" ? (
                      <Checkbox disabled checked={true} name="rear_left" />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="rear_left"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="rear_left" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="rear_left"
                    />
                  )
                }
                label="Rear Left"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.rear_right ? (
                    value.status === "Completed" ? (
                      <Checkbox disabled checked={true} name="rear_right" />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="rear_right"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="rear_right" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="rear_right"
                    />
                  )
                }
                label="Rear Right"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="brake_size"
            label="Brakes Size"
            variant="outlined"
            value={value.brake_size}
            fullWidth
            readOnly={value.status === "Completed"}
            inputProps={{
              readOnly: value.status === "Completed",
            }}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField fullWidth {...props} />}
              label="Due Date"
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
          </LocalizationProvider>
        </Grid>
        <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField fullWidth {...props} />}
              label="Date Completed"
              name="date_time_completed"
              fullWidth
              value={value.date_time_completed}
              onChange={(e) => handleChangeTime(e, "date_time_completed")}
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
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            type="number"
            name="current_mileage"
            label="Mileage"
            variant="outlined"
            value={value.current_mileage}
            fullWidth
            SelectProps={{
              native: true,
            }}
            onChange={(e) => handleChange(e)}
            readOnly={value.status === "Completed"}
            inputProps={{
              readOnly: value.status === "Completed",
            }}
            // SelectProps={{
            //   native: true,
            // }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Cost"
            fullWidth
            variant="outlined"
            value={value.cost}
            type="number"
            name="cost"
            onChange={(e) => handleChange(e)}
            readOnly={value.status === "Completed"}
            inputProps={{
              readOnly: value.status === "Completed",
            }}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            select
            name="number_of_brakes"
            label="Number of Brakes"
            variant="outlined"
            value={value.number_of_brakes}
            fullWidth
            readOnly={value.status === "Completed"}
            inputProps={{
              readOnly: value.status === "Completed",
            }}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange(e)}
          >
            <option> </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            select
            name="status"
            label="Service Status"
            variant="outlined"
            value={value.status}
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled={value.method === "done"}
            SelectProps={{
              native: true,
            }}
            onChange={(e) => handleChange(e)}
          >
            <option value="Not Booked">Not Booked</option>
            <option value="Booked">Booked</option>
            <option value="Pending Validation">Pending Validation</option>
            <option value="Completed">Completed</option>
          </TextField>
        </Grid>
      </Grid>

      <div style={{ marginTop: "50px", textAlign: "right" }}>
        <Button
          disabled={value.status === "Completed" || rowId}
          onClick={() => handleBack()}
          style={{ marginRight: "8px" }}
        >
          Back
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
