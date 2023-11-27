import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { AddCircleOutlineRounded as AddIcon } from "@mui/icons-material";
import AddCustomerForm from "../Forms/AddCustomerForm";

export default function AddCustomerDialog({ onChange }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)} edge="start">
        <AddIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <AddCustomerForm handleClose={handleClose} onChange={onChange} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}
