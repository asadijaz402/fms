import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  useTheme,
  IconButton,
  Button,
} from "@mui/material";
import PermissionForm from "../forms/PermissionsForm";
import { Close as CloseIcon, Key as KeyIcon } from "@mui/icons-material";

export default function PermissionsDialog({ data }) {
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
      <Tooltip title="Manage User Permissions">
        <Button fullWidth onClick={handleClickOpen} startIcon={<KeyIcon />}>
          User Permissions
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>Manage Permissions ({data?.first_name})</DialogTitle>
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
          <PermissionForm
            data={data}
            handleClickClose={handleClickClose}
            open={open}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
