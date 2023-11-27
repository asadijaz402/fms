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
import { useVehicleGroupForm } from "../hooks";

export default function VehicleGroupForm({ id, handleClickClose, data }) {
  const { handleSubmit, handleChange, value, loading, error } =
    useVehicleGroupForm(id, handleClickClose, data);

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
          label="Name"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box mb={1} pt={1}>
        <TextField
          required
          value={value.code}
          name="code"
          label="Group Code"
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
