import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TextField, Typography, Button } from "@mui/material";
import Alert from "@mui/lab/Alert";

export default function SelectVehicle(props) {
  let vehicleList = useSelector((state) => state.api.vehicle);
  let tyresVehicles = useSelector((state) => state.api.tyres);
  const [value, setValue] = useState({});
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    props.handleChange(e);
    setValue({ ...value, [e.target.name]: e.target.value });
    setError(false);
    tyresVehicles &&
      tyresVehicles.length !== 0 &&
      tyresVehicles.filter((v) => {
        if (
          v.vehicle.id.toString() === e.target.value &&
          (v.status !== "Booked" || v.status !== "Completed")
        ) {
          setError(true);
          setValue({ ...value, [e.target.name]: "" });
        }
        return null;
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleNext();
  };

  if (vehicleList && vehicleList.length !== 0) {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        {error && (
          <Alert style={{ margin: "16px 0 16px 0" }} severity="error">
            Vehicle already booked for tyres.
          </Alert>
        )}
        <TextField
          required
          select
          name="vehicle"
          label="Select Vehicle"
          variant="outlined"
          value={value.vehicle}
          fullWidth
          SelectProps={{
            native: true,
          }}
          onChange={(e) => handleChange(e)}
        >
          <option value=""></option>
          {vehicleList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.vehicle_reg_no}
            </option>
          ))}
        </TextField>
        <div style={{ marginTop: "50px", textAlign: "right" }}>
          <Button disabled style={{ marginRight: "16px" }}>
            Back
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </div>
      </form>
    );
  } else {
    return (
      <div sytyle={{ width: "100%", margin: "20px auto", textAlign: "center" }}>
        <Typography variant="h6">Fetching vehicle list ...</Typography>
      </div>
    );
  }
}
