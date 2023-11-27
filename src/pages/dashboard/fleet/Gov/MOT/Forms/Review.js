import React from "react";
import { CircularProgress, Box, Typography, Button } from "@mui/material";

export default function Review({ loading, handleClose }) {
  return (
    <Box mt={2}>
      {loading ? (
        <CircularProgress />
      ) : (
        <Box style={{ textAlign: "left" }}>
          <Typography variant="h3">MOT Booked success.</Typography>
        </Box>
      )}
      <Box
        mt={4}
        mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
