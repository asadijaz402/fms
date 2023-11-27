import React from "react";
import { Grid, Box, Button } from "@mui/material";
import DynamicDialogs from "../../../../../Components/DynamicDialogs/DynamicDialogs";

const formFields = [
  {
    url: "vehicle/vehicle-types",
    required: true,
    name: "vehicle_type_id",
    label: "Vehicle Type",
    inputText: "name",
  },
  {
    url: "vehicle/manufacturer",
    required: true,
    name: "manufacturer_id",
    label: "Manufacturer",
    inputText: "name",
  },
  {
    url: "vehicle/depot",
    required: true,
    name: "depot_id",
    label: "Depot",
    inputText: "details",
  },
  {
    url: "vehicle/group",
    required: false,
    name: "group_id",
    label: "Group",
    inputText: "name",
    multiple: true,
  },
];

export default function AddVehTwo({
  handleNext,
  handleBack,
  values,
  handleChange,
  handleSave,
}) {
  const onSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <form autoComplete="on" onSubmit={onSubmit}>
      <Grid container spacing={2}>
        {formFields.map((field, index) => {
          return (
            <Grid item xs={6}>
              <DynamicDialogs
                url={field.url}
                autoFocus={index === 0}
                required={field.required}
                onChange={handleChange}
                value={values[field.name]}
                name={field.name}
                label={field.label}
                inputText={field.inputText}
                {...field}
              />
            </Grid>
          );
        })}
      </Grid>
      <Box mt={2} mb={2} width={"100%"} display="flex">
        <Box flexGrow={1}>
          {values.id && (
            <Button variant="outlined" color="primary" onClick={handleSave}>
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
