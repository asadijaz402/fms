import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  AddRounded as AddIcon,
  VisibilityRounded as VisibilityIcon,
} from "@mui/icons-material";
import VORGarageStepper from "../Stepper/VORGarageStepper";

export default function EditTyresBookingDialog({
  rowId = false,
  viewVehicles = false,
  icon = false,
}) {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {rowId ? (
        viewVehicles ? (
          <Tooltip placement="top" title="Edit VOR Garage">
            <Button
              size="small"
              variant="outlined"
              color="info"
              onClick={() => openDialog()}
              startIcon={<VisibilityIcon />}
            >
              View
            </Button>
          </Tooltip>
        ) : (
          <Tooltip placement="top" title="Edit VOR Garage">
            <Button
              size="small"
              variant="outlined"
              onClick={() => openDialog()}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
          </Tooltip>
        )
      ) : (
        <Tooltip placement="top" title="Add VOR Garage">
          <IconButton size="small" onClick={() => openDialog()}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      {rowId ? (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Edit VOR Garage</DialogTitle>
          <DialogContent>
            <VORGarageStepper
              viewVehicles={viewVehicles}
              rowId={rowId}
              handleClose={handleClose}
            />
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Add VOR Garage</DialogTitle>
          <DialogContent>
            <VORGarageStepper
              viewVehicles={viewVehicles}
              rowId={rowId}
              handleClose={handleClose}
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
