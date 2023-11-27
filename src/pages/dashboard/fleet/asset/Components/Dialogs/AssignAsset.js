import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import Autocomplete from "@mui/lab/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../../slices/CustomSlices/actions/apiActions";
import useAssetForm from "../Hooks/useAssetForm";

export default function AssignAsset({
  rowId = false,
  data,
  handleClose,
  step = 0,
}) {
  const { AssetChange, asset, assignedVehicle } = useAssetForm(
    rowId,
    
    handleClose,
    step
  );
  const [options, setOptions] = useState([]);
  const token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData("", "assets/list", token, false)).then((res) => {
      setOptions(
        res.data.results.map((data) => {
          return { label: data.name, value: data.id };
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
          AssetChange(newValue);
        }}
        sx={{ minWidth: 300, width: "100%" }}
        renderInput={(params) => <TextField {...params} label="Asset Name" />}
      />

      <Button
        variant="contained"
        disabled={!asset}
        sx={{ mt: 2 }}
        onClick={() => assignedVehicle(data?.vehicle.id)}
        fullWidth
      >
        Assign Asset
      </Button>
    </Box>
  );
}
