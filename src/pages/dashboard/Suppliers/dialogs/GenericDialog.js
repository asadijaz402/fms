import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import {
  AddCircleOutlineRounded as AddIcon,
  EditRounded as EditIcon,
} from "@mui/icons-material";
import { SupplierForm } from "../forms";

const Forms = (props) => {
  switch (props.name) {
    case "Suppliers":
      return <SupplierForm {...props} />;
    default:
      return (
        <Typography variant="body1" color="error">
          Error rendiring Form.
        </Typography>
      );
  }
};

export default function GenericDialog({ id = false, form, data }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      {id ? (
        <Tooltip placement="top" title="Edit">
          <IconButton size="small" variant="outlined" onClick={handleClickOpen}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add New">
          <IconButton onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>{id ? "Edit " : "Add New "}</DialogTitle>
        <DialogContent>
          <Forms
            name={form}
            data={data}
            id={id}
            handleClickClose={handleClickClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
