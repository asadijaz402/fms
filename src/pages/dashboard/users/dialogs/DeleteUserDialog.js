import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  IconButton,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Refresh as RecoverIcon,
} from "@mui/icons-material";
import useDeleteUser from "../hooks/useDeleteUser";

export default function DeleteServiceDialog({ data }) {
  const { isLoading, makeCall, setOpen, open } = useDeleteUser(
    data.id,
    data.is_active
  );

  const ActionButton = () => {
    if (data.is_active) {
      return (
        <Tooltip placement="top" title="Delete">
          <IconButton
            size="small"
            color="error"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip placement="top" title="Recover">
          <IconButton
            size="small"
            color="warning"
            variant="outlined"
            onClick={() => setOpen(true)}
          >
            <RecoverIcon />
          </IconButton>
        </Tooltip>
      );
    }
  };

  return (
    <>
      <ActionButton />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          {data.is_active ? "Delete " : "Recover "}User?{" "}
          {isLoading && <CircularProgress />}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "20px" }}>
          <DialogContentText>
            Are you sure, you want to {data.is_active ? "delete " : "recover "}
            the following user.
            <br />
            <br />
            Full Name : <b>{data.first_name}</b>
            <br />
            Email : <b>{data.email}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              makeCall();
            }}
          >
            {data.is_active ? "Delete" : "Recover"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
