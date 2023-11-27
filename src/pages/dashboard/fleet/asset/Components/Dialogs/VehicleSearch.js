import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../../slices/CustomSlices/actions/apiActions";
import useAssetForm from "../Hooks/useAssetForm";

export default function VehicleSearch({
  rowId = false,
  data,
  handleClose,
  step = 0,
}) {
  const { vehicleChange, vehicle, assignedVehicle } = useAssetForm(
    rowId,
    data,
    handleClose,
    step
  );
  const [options, setOptions] = useState([]);
  const token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData("", "vehicle/list", token, false)).then((res) => {
      setOptions(
        res.data.results.map((data) => {
          return { label: data.vehicle_reg_no, value: data.id };
        })
      );
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Autocomplete
        multiple
        // disablePortal
        options={options}
        onChange={(event, newValue) => {
          vehicleChange(newValue);
        }}
        sx={{ minWidth: 300, width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Vehicle Number" />
        )}
      />

      <Button
        variant="contained"
        disabled={!vehicle}
        sx={{ mt: 2 }}
        onClick={assignedVehicle}
        fullWidth
      >
        Assign Vehicle
      </Button>
    </Box>
  );
}
