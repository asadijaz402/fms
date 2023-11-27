import React from "react";
import {
  Backdrop,
  CircularProgress,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Grid,
} from "@mui/material";
import { useSupplierForm } from "../hooks";

export default function SupplierForm({ id, handleClickClose, data }) {
  const { handleSubmit, handleChange, value, loading, error } = useSupplierForm(
    id,
    handleClickClose,
    data
  );

  return (
    <form onSubmit={handleSubmit}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box mb={1} pt={1}>
            <TextField
              required
              autoFocus
              value={value.first_name}
              name="first_name"
              label="First Name"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box mb={1} pt={1}>
            <TextField
              required
              value={value.last_name}
              name="last_name"
              label="Last Name"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box mb={1} pt={1}>
            <TextField
              required
              type="email"
              value={value.email}
              name="email"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Box mb={1} pt={1}>
            <TextField
              value={value.contact}
              name="contact"
              label="Contact"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box mb={1} pt={1}>
            <TextField
              value={value.details}
              name="details"
              rows={4}
              multiline
              label="Details"
              variant="outlined"
              onChange={handleChange}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
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
