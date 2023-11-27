import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Tooltip,
  DialogActions,
  Button,
  IconButton,
  CircularProgress,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  deleteData,
  getData,
} from "../../../../../../../slices/CustomSlices/actions/apiActions";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteBrakesBookingDialog({ rowId }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [rowData, setRowData] = useState({});
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const openDialog = () => {
    setOpen(true);
    dispatch(
      getData(rowId, "vehicle_accessories/brakes", id_token, false)
    ).then((res) => {
      setRowData(res.data);
      setLoading(false);
    });
  };

  const onDeleteButtonClick = () => {
    setLoading(true);
    dispatch(
      deleteData(rowId, "vehicle_accessories/brakes", id_token, false)
    ).then((res) => {
      setOpen(false);
    });
  };

  return (
    <>
      <Tooltip placement="top" title="Delete Brakes Service Booking">
        <IconButton size="small" color="error" onClick={() => openDialog()}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Delete Brake Service?{isLoading && <CircularProgress />}
        </DialogTitle>
        <DialogContent>
          {!isLoading && (
            <DialogContentText>
              Are you sure, you want to delete brake service entry.
              <br />
              Reg No: <b>{rowData.vehicle.vehicle_reg_no}</b>
            </DialogContentText>
          )}
        </DialogContent>
        {!isLoading && (
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                onDeleteButtonClick();
              }}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}
