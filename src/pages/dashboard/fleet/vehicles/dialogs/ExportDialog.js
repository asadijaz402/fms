import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateData, getData } from "src/Redux/actions/apiActions";
import { store } from "react-notifications-component";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  IconButton,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { Print as PrintIcon } from "@mui/icons-material";
import ImportForm from "src/forms/ImportForm";

export default function ExportDialog() {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip placement="top" title="Edit">
        <IconButton size="small" onClick={openDialog}>
          <PrintIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Export </DialogTitle>
        <DialogContent>
          <ImportForm handleClickClose={handleClose}></ImportForm>
        </DialogContent>
      </Dialog>
    </>
  );
}
