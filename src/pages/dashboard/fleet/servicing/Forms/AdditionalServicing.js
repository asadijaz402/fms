import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import TyresBookingDialog from "../tyres/Components/Dialogs/TyresBookingDialog";
import BrakesBookingDialog from "../brakes/Components/Dialogs/BrakesBookingDialog";

export default function AdditionalServicing({ handleClose, vehicleId, value }) {
  return (
    <>
      {value.status !== "Completed" && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography varaint="body1">Addition servicing.</Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TyresBookingDialog vehicleId={vehicleId} fullButton />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <BrakesBookingDialog vehicleId={vehicleId} fullButton />
          </Grid>
        </Grid>
      )}
      <Box
        mt={2}
        mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button variant="outlined" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Box>
    </>
  );
}
