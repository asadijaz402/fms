import React, { useState } from "react";
import { Dialog, DialogContent, Button, Box } from "@mui/material";
import SelectLocation from "../Forms/SelectLocation";

export default function LocationDialo({ value, handleChange }) {
  const [open, setOpen] = useState(false);

  return (
    <Box mb={2}>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Select Nearest Garage
      </Button>
      <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
        <DialogContent>
          <SelectLocation
            value={value}
            handleChange={handleChange}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
