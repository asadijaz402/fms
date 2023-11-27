import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  useTheme,
  IconButton,
} from "@mui/material";
import PasswordResetForm from "../forms/PasswordResetForm";
import {
  Close as CloseIcon,
  LockReset as ResetIcon,
} from "@mui/icons-material";

export default function PasswordReset({ id, data }) {
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
      <Tooltip placement="top" title="Reset Password">
        <IconButton color="info" variant="outlined" onClick={handleClickOpen}>
          <ResetIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>Reset Password</DialogTitle>
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
          <PasswordResetForm
            id={id}
            data={data}
            handleClickClose={handleClickClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
