import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import VORSearch from "../Forms/VORSearch";

export default function AddVORDialog({ VORData, vehicleData }) {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip placement="top" title="Add Vehicle to VOR">
        <IconButton size="small" color="secondary" onClick={() => openDialog()}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Add Vehicle {vehicleData[1]} to VOR {VORData[2]}?
        </DialogTitle>
        <IconButton
          aria-label="close"
          style={{ position: "absolute", right: "8px", top: "8px" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <VORSearch />
        </DialogContent>
      </Dialog>
    </>
  );
}
