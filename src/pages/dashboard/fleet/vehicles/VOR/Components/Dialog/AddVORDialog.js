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
import EditVORGarageForm from "../Forms/EditVORGarageForm";

export default function AddVORDialog({ history }) {
  const [open, setOpen] = useState(false);
  const [vehicleName, setVehName] = useState("");
  const [step, setStep] = useState(0);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip placement="top" title="Edit Tyres Booking">
        <IconButton size="small" color="secondary" onClick={() => openDialog()}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">
          Add VOR {vehicleName && step >= 1 && "for" + " " + vehicleName}
        </DialogTitle>
        <IconButton
          aria-label="close"
          style={{ position: "absolute", right: "8px", top: "8px" }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <EditVORGarageForm
            setStep={setStep}
            setVehName={setVehName}
            handleClose={handleClose}
            dataPassed={false}
            history={history}
            viewList={false}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
