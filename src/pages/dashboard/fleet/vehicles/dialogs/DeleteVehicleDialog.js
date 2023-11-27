import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteVehicle from "./useDeFleetVehicle";

export default function DeleteServiceDialog({ rowId }) {
  const { isLoading, makeCall, setOpen, open } = useDeleteVehicle(
    rowId.vehicle_reg_no,
    true
  );

  return (
    <>
      <Button
        size="small"
        color="warning"
        fullWidth
        onClick={() => setOpen(true)}
        startIcon={<DeleteIcon />}
      >
        Delete Vehicle
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          De-fleet Vehicle? {isLoading && <CircularProgress />}
        </DialogTitle>
        <DialogContent style={{ paddingBottom: "20px" }}>
          <DialogContentText>
            Are you sure, you want to de-fleet following vehicle.
            <br />
            Reg No : <b>{rowId.vehicle_reg_no}</b>
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
            De-fleet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
