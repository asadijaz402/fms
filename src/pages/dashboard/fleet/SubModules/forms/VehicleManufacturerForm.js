import React from "react";
import {
  Backdrop,
  CircularProgress,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { useVehicleManufacturerForm } from "../hooks";

export default function VehicleManufacturerForm({
  id,
  handleClickClose,
  data,
}) {
  const { handleSubmit, handleChange, value, loading, error } =
    useVehicleManufacturerForm(id, handleClickClose, data);

  return (
    <form onSubmit={handleSubmit}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box mb={1} pt={1}>
        <TextField
          required
          autoFocus
          value={value.name}
          name="name"
          label="Company Name"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box mt={2} mb={2}>
        <Divider />
      </Box>
      {error && (
        <Typography align="center" variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Box sx={{ mt: 3 }}>
        <Button
          color="primary"
          disabled={loading}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          {id ? "Update" : "Add"}
        </Button>
      </Box>
    </form>
  );
}
