import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  useTheme,
  Button,
  IconButton,
} from "@mui/material";
import AddVehicleForm from "../forms/AddVehicleForm";
import {
  Close as CloseIcon,
  AddCircleOutlineRounded as AddIcon,
  EditRounded as EditIcon,
} from "@mui/icons-material";

export default function AddVehicleDialog({ id = false, dashboard = false }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      {id ? (
        <Button
          size="small"
          fullWidth
          onClick={() => setOpen(true)}
          startIcon={<EditIcon />}
        >
          Edit Vehicle
        </Button>
      ) : dashboard ? (
        <Button
          sx={{ mr: 1 }}
          size="small"
          variant="contained"
          onClick={() => setOpen(true)}
          startIcon={<AddIcon />}
        >
          Add Vehicle
        </Button>
      ) : (
        <Tooltip title="Add New Vehicle">
          <IconButton onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={open}>
        <DialogTitle>{id ? "Edit vehicle" : "Add New Vehicle"}</DialogTitle>
        <IconButton
          style={{
            position: "absolute",
            right: theme.spacing(2),
            top: theme.spacing(2),
          }}
          onClick={handleClickClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <AddVehicleForm id={id} handleClickClose={handleClickClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
