import React from "react";
import { Grid, TextField, Box, Button } from "@mui/material";

export default function GarageDetailsForm({
  value,
  handleChange,
  handleNext,
  handleClickClose,
}) {
  const onSubmit = (e) => {
    e.preventDefault();

    handleNext();
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <TextField
            required="true"
            name="name"
            label="Garage Name"
            variant="outlined"
            value={value.name}
            fullWidth
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="address"
            label="Address"
            variant="outlined"
            value={value.address}
            fullWidth
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="city"
            label="City"
            variant="outlined"
            value={value.city}
            fullWidth
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            name="country"
            label="Country"
            variant="outlined"
            value={value.country}
            fullWidth
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <TextField
            name="other_details"
            multiline="true"
            rows="3"
            label="Other Details"
            variant="outlined"
            value={value.other_details}
            fullWidth
            onChange={(e) => handleChange(e)}
          />
        </Grid>
      </Grid>
      <Box
        mt={2}
        mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
        <Box mr={1}>
          <Button onClick={handleClickClose}>Close</Button>
        </Box>
      </Box>
    </form>
  );
}
