import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  useTheme,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import UserForm from "../forms/UserForm";
import {
  Close as CloseIcon,
  AddCircleOutlineRounded as AddIcon,
  EditRounded as EditIcon,
} from "@mui/icons-material";
import PermissionsDialog from "./PermissionsDialog";

export default function UserDialog({ id = false, data }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const ActionButton = () => {
    if (id) {
      return (
        <Tooltip placement="top" title="Edit User">
          <IconButton color="info" variant="outlined" onClick={handleClickOpen}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title="Add New User">
          <IconButton onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      );
    }
  };

  return (
    <>
      <ActionButton />
      <Dialog open={open}>
        <DialogTitle>{id ? "Edit User" : "Add New User"}</DialogTitle>
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
          <UserForm id={id} data={data} handleClickClose={handleClickClose} />
          <Box mt={3} mb={1}>
            <Divider />
          </Box>
          <Box mt={1} mb={1}>
            <PermissionsDialog data={data} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
