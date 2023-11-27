import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  AddRounded as AddIcon,
  ListAltRounded as ViewIcon,
} from "@mui/icons-material";
import PrecheckStepper from "../Stepper/PrecheckStepper";

export default function PrecheckDialog({
  vehicleId,
  tableMeta,
  rowId = false,
}) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {rowId ? (
        <Tooltip placement="top" title="View Precheck">
          <IconButton onClick={() => setOpen(true)} size="small">
            <ViewIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip placement="top" title="Add New Precheck">
          <IconButton onClick={() => setOpen(true)} size="small">
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}

      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <DialogTitle>Vehicle Check Form</DialogTitle>
        <DialogContent>
          <PrecheckStepper
            tableMeta={tableMeta}
            vehicleId={vehicleId}
            handleClose={handleClose}
            rowId={rowId}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
