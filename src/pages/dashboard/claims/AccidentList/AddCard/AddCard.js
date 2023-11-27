import React from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import Stepper from "./Stepper";
import { AddCircleOutlineRounded as AddIcon } from "@mui/icons-material";

export default function FormDialog({ BreakdownList }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Add New Service">
        <IconButton onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add{!BreakdownList ? " Accident" : " Breakdown"}
        </DialogTitle>
        <DialogContent>
          <Stepper handleClose={handleClose} BreakdownList={BreakdownList} />
        </DialogContent>
      </Dialog>
    </>
  );
}
