import React from "react";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Backdrop,
  CircularProgress,
  Divider,
} from "@mui/material";
import useUserForm from "../hooks/useUserForm";

export default function UserForm({ id, handleClickClose, data }) {
  const { handleSubmit, handleChange, value, loading, error } = useUserForm(
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
          <TextField
            required
            autoFocus
            value={value.first_name}
            name="first_name"
            label="Full Name"
            variant="outlined"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            required
            value={value.email}
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            fullWidth
            InputProps={{
              readOnly: id ? true : false,
            }}
            type="email"
          />
        </Grid>
        {!id && (
          <>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <TextField
                required
                value={value.password}
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="body2">
                Make sure password is unique and follows proper standards.
              </Typography>
            </Grid>
          </>
        )}
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
          {id ? "Update" : "Register"}
        </Button>
      </Box>
    </form>
  );
}
