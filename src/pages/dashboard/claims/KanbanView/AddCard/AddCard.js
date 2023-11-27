import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import Stepper from "./Stepper";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        fullWidth
        onClick={handleClickOpen}
        variant="contained"
        disableElevation
        style={{
          background: "#5BABE4",
          marginBottom: "16px",
          color: "#fff",
          marginRight: "38px",
        }}
      >
        <AddCircleIcon style={{ marginRight: "8px" }} /> Add Accident
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Accident</DialogTitle>
        <DialogContent>
          <Stepper handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
