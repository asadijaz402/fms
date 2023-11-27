import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Tooltip,
  Box,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  AddCircleOutlineRounded as AddIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";
import Progress from "../../../../../Components/Progress";
import ServicingStepper from "../Stepper/ServicingStepper";

export default function AddService({
  rowId = false,
  vehicleId = false,
  calendar = false,
  modalOpen = false,
  handleCloseModal = false,
  status = false,
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [rowData, setRowData] = useState({});
  const [id, setId] = useState(rowId);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    setOpen(modalOpen);
  }, [modalOpen]);

  const handleClose = () => {
    if (handleCloseModal) {
      handleCloseModal(false);
    }
    setOpen(false);
  };

  const getRowData = () => {
    setLoading(true);
    setId(rowId);
    dispatch(
      getData(rowId, "vehicle_accessories/service", id_token, false)
    ).then((res) => {
      setRowData(res.data);
      setLoading(false);
    });
  };

  const openDialog = () => {
    setOpen(true);
    if (rowId) {
      getRowData();
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      if (rowId) {
        getRowData();
      }
    }
    // eslint-disable-next-line
  }, [rowId, open]);

  return (
    <>
      {!calendar &&
        (rowId ? (
          <Tooltip
            placement="top"
            title={status && status === "Completed" ? "View" : "Edit Service"}
          >
            <IconButton size="small" onClick={openDialog}>
              {status && status === "Completed" ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <EditIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        ) : vehicleId ? (
          <Tooltip placement="top" title="Add New Service">
            <Button
              startIcon={<AddIcon />}
              size="small"
              variant="outlined"
              onClick={openDialog}
            >
              Add
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Add New Service">
            <IconButton onClick={openDialog}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Service</DialogTitle>
        <DialogContent>
          <Box mb={2}>
            {isLoading ? (
              <Progress />
            ) : (
              <ServicingStepper
                handleClose={handleClose}
                dataPassed={rowData}
                rowId={id}
                vehicleId={vehicleId}
                setId={setId}
              />
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
