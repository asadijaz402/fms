import React from "react";
import { Box, ButtonGroup, Button, Typography } from "@mui/material";

export default function Lead({ handleNext, onChange }) {
  const onClick = (value) => {
    onChange({
      target: {
        name: "booking_via",
        value: value,
      },
    });
    handleNext();
  };

  return (
    <Box mt={2} mb={2}>
      <Typography variant="h6">Lead source?</Typography>
      <Box mt={2}>
        <ButtonGroup variant="contained" color="primary" fullWidth>
          <Button onClick={() => onClick("email")}>Email</Button>
          <Button onClick={() => onClick("call")}>Call</Button>
          <Button onClick={() => onClick("text/sms")}>Text</Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
