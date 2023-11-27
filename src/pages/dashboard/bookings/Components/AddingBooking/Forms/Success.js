import React from "react";
import { Typography, Button, Box } from "@mui/material";

export default function Success({ success, handleClose }) {
  return (
    <Box>
      <Box>
        <Typography variant="h6">
          {success ? "Booking added successfully." : "There was an error."}
        </Typography>
      </Box>
      <Box>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Box>
  );
}
