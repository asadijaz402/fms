import React, { useState, useEffect } from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import DynamicDialogs from "../../../../../Components/DynamicDialogs/DynamicDialogs";

export default function Garage({
  value,
  handleChange,
  handleNext,
  handleBack,
}) {
  const [showForm, setShowForm] = useState("garage");
  let sts = value.status === "Completed" ? "disabled" : "";
  const onSubmit = (e) => {
    e.preventDefault();

    if (showForm === "garage") {
      handleChange({
        target: {
          name: "manufacturers_servicing",
          value: "",
        },
      });
    } else if (showForm === "manufacturers_servicing") {
      handleChange({
        target: {
          name: "garage",
          value: "",
        },
      });
    }

    handleNext();
  };

  useEffect(() => {
    if (value.garage) {
      setShowForm("garage");
    } else if (value.manufacturers_servicing) {
      setShowForm("manufacturers_servicing");
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
          {value.status === "Completed" ? (
            <Button
              disabled
              onClick={() => {
                setShowForm("garage");
              }}
              color="primary"
              variant={showForm === "garage" ? "contained" : "outlined"}
              fullWidth
            >
              Garage
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowForm("garage");
              }}
              color="primary"
              variant={showForm === "garage" ? "contained" : "outlined"}
              fullWidth
            >
              Garage
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          {value.status === "Completed" ? (
            <Button
              disabled
              onClick={() => {
                setShowForm("manufacturers_servicing");
              }}
              fullWidth
              color="primary"
              variant={
                showForm === "manufacturers_servicing"
                  ? "contained"
                  : "outlined"
              }
            >
              Dealer (Dealers Garage)
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowForm("manufacturers_servicing");
              }}
              fullWidth
              color="primary"
              variant={
                showForm === "manufacturers_servicing"
                  ? "contained"
                  : "outlined"
              }
            >
              Dealer (Dealers Garage)
            </Button>
          )}
        </Grid>
      </Grid>
      <Box mt={2}>
        {showForm === "garage" && (
          <DynamicDialogs
            sts={sts}
            url="garages"
            required={true}
            onChange={handleChange}
            value={value.garage}
            name="garage"
            label="Select Garage"
            inputText="garage_name"
            autoFocus={true}
          />
        )}
        {showForm === "manufacturers_servicing" && (
          <DynamicDialogs
            autoFocus={true}
            sts={sts}
            url="manufacturers/garages"
            required
            onChange={handleChange}
            value={value.manufacturers_servicing}
            name="manufacturers_servicing"
            label="Select Dealers Garage"
            inputText="manufacturer_name"
            // post={false}
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
