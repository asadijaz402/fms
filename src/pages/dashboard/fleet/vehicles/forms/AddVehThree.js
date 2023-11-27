import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import DynamicDialogs from "../../../../../Components/DynamicDialogs/DynamicDialogs";

export default function AddVehThree({
  handleChange,
  handleBack,
  handleNext,
  values,
  handleSave,
}) {
  const [showForm, setShowForm] = useState(false);

  const updateChange = () => {
    if (showForm) {
      handleChange({
        target: {
          name: "supplier_id",
          value: "",
        },
      });
    } else {
      handleChange({
        target: {
          name: "employee_id",
          value: "",
        },
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    updateChange();

    handleNext();
  };

  const handleQuickSave = () => {
    updateChange();

    handleSave();
  };

  useEffect(() => {
    if (values.employee_id) {
      setShowForm(true);
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
              setShowForm(false);
            }}
            color="primary"
            variant={showForm ? "outlined" : "contained"}
            fullWidth
          >
            External Supplier
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Button
            onClick={() => {
              setShowForm(true);
            }}
            fullWidth
            color="primary"
            variant={showForm ? "contained" : "outlined"}
          >
            Internal Supplier
          </Button>
        </Grid>
      </Grid>
      <Box mt={2}>
        {!showForm ? (
          <DynamicDialogs
            url="vehicle/supplier"
            required={true}
            onChange={handleChange}
            value={values.supplier_id}
            name="supplier_id"
            label="External Supplier"
            inputText="email"
            autoFocus={true}
          />
        ) : (
          <DynamicDialogs
            autoFocus={true}
            url="account/staff/all"
            required={true}
            onChange={handleChange}
            value={values.employee_id}
            name="employee_id"
            label="Internal Supplier / Employee"
            inputText="email"
            post={false}
          />
        )}
      </Box>

      <Box mt={2} mb={2} width={"100%"} display="flex">
        <Box flexGrow={1}>
          {values.id && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleQuickSave}
            >
              Quick Save & Close
            </Button>
          )}
        </Box>
        <Box mr={1}>
          <Button onClick={handleBack}>Back</Button>
        </Box>
        <Box>
          <Button variant="contained" color="primary" type="submit">
            Next
          </Button>
        </Box>
      </Box>
    </form>
  );
}
