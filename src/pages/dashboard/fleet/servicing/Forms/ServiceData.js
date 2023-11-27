import React from "react";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";

export default function ServiceData({
  value,
  handleChange,
  handleChangeCheck,
  handleNext,
  handleBack,
}) {
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
                  value.oil_change ? (
                    value.status === "Completed" ? (
                      <Checkbox
                        disabled
                        checked={value.status === "Completed"}
                        onChange={handleChangeCheck}
                        name="oil_change"
                      />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="oil_change"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="oil_change" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="oil_change"
                    />
                  )
                }
                label="Oil Change"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  value.oil_filter ? (
                    value.status === "Completed" ? (
                      <Checkbox disabled checked={true} name="oil_filter" />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="oil_filter"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="oil_filter" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="oil_filter"
                    />
                  )
                }
                label="Oil Filter"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.fuel_filter ? (
                    value.status === "Completed" ? (
                      <Checkbox disabled checked={true} name="fuel_filter" />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="fuel_filter"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="fuel_filter" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="fuel_filter"
                    />
                  )
                }
                label="Fuel Filter"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.air_filter ? (
                    value.status === "Completed" ? (
                      <Checkbox disabled checked={true} name="air_filter" />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="air_filter"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="air_filter" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="air_filter"
                    />
                  )
                }
                label="Air Filter"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.pollen_filter ? (
                    value.status === "Completed" ? (
                      <Checkbox disabled checked={true} name="pollen_filter" />
                    ) : (
                      <Checkbox
                        checked={true}
                        onChange={handleChangeCheck}
                        name="pollen_filter"
                      />
                    )
                  ) : value.status === "Completed" ? (
                    <Checkbox disabled checked={false} name="pollen_filter" />
                  ) : (
                    <Checkbox
                      checked={false}
                      onChange={handleChangeCheck}
                      name="pollen_filter"
                    />
                  )
                }
                label="Pollen Filter"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            multiline
            rows={5}
            label="Other Services"
            fullWidth
            variant="outlined"
            value={value.additions_service}
            type="text"
            name="additions_service"
            onChange={(e) => handleChange(e)}
            readOnly={value.status === "Completed"}
            inputProps={{
              readOnly: value.status === "Completed",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        {/* <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField fullWidth {...props} />}
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
          </LocalizationProvider>
        </Grid>
        <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
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
          </LocalizationProvider>
        </Grid> */}
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Cost"
            fullWidth={true}
            variant="outlined"
            style={{ width: "100%" }}
            value={value.cost}
            type="number"
            name="cost"
            onChange={handleChange}
            readOnly={value.status === "Completed"}
            InputProps={{
              readOnly: value.status === "Completed",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            select
            required
            name="status"
            label="Service Status"
            variant="outlined"
            value={value.status}
            fullWidth
            disabled={value.status === "Completed" || value.method === "post"}
            SelectProps={{
              native: true,
            }}
            onChange={(e) => handleChange(e)}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <option value=""></option>

            <option value="Booked">Booked</option>
            <option value="Pending Validation">Pending Validation</option>
            <option value="Completed">Completed</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Service Number"
            fullWidth={true}
            variant="outlined"
            style={{ width: "100%" }}
            value={value.service_number}
            type="text"
            name="service_number"
            onChange={(e) => handleChange(e)}
            readOnly={value.status === "Completed"}
            InputProps={{
              readOnly: value.status === "Completed",
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      <div style={{ marginTop: "50px", textAlign: "right" }}>
        <Button
          // disabled={rowId || value.status === "Completed"}
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
