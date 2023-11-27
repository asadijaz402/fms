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
import { useVehicleGarageForm } from "../hooks";

export default function VehicleGarageForm({ id, handleClickClose, data }) {
  const { handleSubmit, handleChange, value, loading, error } =
    useVehicleGarageForm(id, handleClickClose, data);

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
          value={value.garage_name}
          name="garage_name"
          label="Garage Name"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box mb={1} pt={1}>
        <TextField
          required
          value={value.garage_address}
          name="garage_address"
          label="Garage Address"
          variant="outlined"
          multiline
          rows={4}
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box mb={1} pt={1}>
        <TextField
          required
          value={value.contact_person_name}
          name="contact_person_name"
          label="Contact Person Name"
          variant="outlined"
          onChange={handleChange}
          fullWidth
        />
      </Box>
      <Box mb={1} pt={1}>
        <TextField
          required
          value={value.contact_person_number}
          name="contact_person_number"
          label="Contact Person Number"
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
