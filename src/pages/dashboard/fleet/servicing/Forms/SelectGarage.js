import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";

export default function SelectGarage({ value, handleChange, garageList }) {
  const [address, setAddress] = useState("");

  return (
    <TextField
      disabled={value.method === "done"}
      select
      name="garage"
      label="Select Garage"
      variant="outlined"
      fullWidth
      value={value.garage}
      InputLabelProps={{ shrink: true }}
      SelectProps={{
        native: true,
      }}
      onChange={(e) => handleChange(e)}
    >
      <option value=""></option>
      {garageList &&
        garageList.map((option) => (
          <option key={option.id} value={option.id}>
            {option.garage_name}
          </option>
        ))}
    </TextField>
  );
}
