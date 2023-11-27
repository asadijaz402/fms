import React from "react";
import { Box, Button } from "@mui/material";
import DynamicDialogs from "../../../../../../Components/DynamicDialogs/DynamicDialogs";

export default function Garage({ value, onChange, handleNext, handleBack }) {
  const onSubmit = (e) => {
    e.preventDefault();

    handleNext();
  };

  return (
    <form onSubmit={onSubmit}>
      <Box mt={2}>
        <DynamicDialogs
          url="garages"
          required={true}
          onChange={onChange}
          value={value.garage}
          name="garage"
          label="Select Garage"
          inputText="garage_name"
          autoFocus={true}
        />
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
