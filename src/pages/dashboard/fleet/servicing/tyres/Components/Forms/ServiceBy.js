import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Typography, TextField } from "@mui/material";
import CustomerSearch from "../../../../../../../Components/Search/CustomerSearch";

export default function ServiceBy({
  value,
  handleChange,
  handleNext,
  handleBack,
}) {
  const [showForm, setShowForm] = useState("customer");

  const onSubmit = (e) => {
    e.preventDefault();

    if (showForm === "customer") {
      handleChange({
        target: {
          name: "employee_name",
          value: "",
        },
      });
    } else if (showForm === "driver") {
      handleChange({
        target: {
          name: "customer",
          value: "",
        },
      });
    }

    handleNext();
  };

  useEffect(() => {
    if (value.customer) {
      setShowForm("customer");
    } else if (value.employee_name) {
      setShowForm("driver");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography varaint="body1">
            Please click on one of the options below.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Button
            onClick={() => {
              setShowForm("customer");
            }}
            color="primary"
            variant={showForm === "customer" ? "contained" : "outlined"}
            fullWidth
          >
            Customer
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Button
            onClick={() => {
              setShowForm("driver");
            }}
            fullWidth
            color="primary"
            variant={showForm === "driver" ? "contained" : "outlined"}
          >
            Driver
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        {showForm === "customer" && (
          <CustomerSearch
            handleChange={handleChange}
            name="customer"
            customer={value.customer}
          />
        )}
        {showForm === "driver" && (
          <TextField
            required
            label="Driver"
            variant="outlined"
            name="employee_name"
            fullWidth
            value={value.employee_name}
            onChange={handleChange}
          />
        )}
      </Box>

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
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </Box>
    </form>
  );
}
