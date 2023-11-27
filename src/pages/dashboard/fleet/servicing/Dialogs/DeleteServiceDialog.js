import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Tooltip,
  Button,
  IconButton,
  CircularProgress,
  DialogContent,
  Box,
  DialogContentText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteData,
  getData,
  snackOpen,
} from "../../../../../slices/CustomSlices/actions/apiActions";

export default function DeleteServiceDialog({ rowId }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [rowData, setRowData] = useState({});
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const openDialog = () => {
    setOpen(true);
    dispatch(
      getData(rowId, "vehicle_accessories/service", id_token, false)
    ).then((res) => {
      setRowData(res.data);
      setLoading(false);
    });
  };

  const onDelete = () => {
    setLoading(true);
    dispatch(
      deleteData(rowId, "vehicle_accessories/service", id_token, false)
    ).then((res) => {
      dispatch(
        snackOpen(
          true,
          "#" + rowData.vehicle.vehicle_reg_no + " Deleted service",
          "success",
          true
        )
      );
      setOpen(false);
    });
  };

  return (
    <>
      <Tooltip placement="top" title="Delete">
        <IconButton size="small" color="error" onClick={() => openDialog()}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Delete Service?</DialogTitle>
        <DialogContent style={{ paddingBottom: "20px" }}>
          {!isLoading ? (
            <DialogContentText>
              Are you sure, you want to delete service entry.
              <br />
              Reg No : <b>{rowData.vehicle.vehicle_reg_no}</b>
            </DialogContentText>
          ) : (
            <Box style={{ textAlign: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </DialogContent>
        {!isLoading && (
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onDelete();
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
