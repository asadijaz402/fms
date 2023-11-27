import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Button,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  AddCircle as AddIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { getData } from "../../../../../../../slices/CustomSlices/actions/apiActions";
import Progress from "../../../../../../../Components/Progress";
import BrakeServiceStepper from "../Stepper/BrakeServiceStepper";
import { useDispatch, useSelector } from "react-redux";

export default function BrakesBookingDialog({
  rowId = false,
  vehicleId = false,
  fullButton = false,
  calendar = false,
  modalOpen = false,
  handleCloseModal = false,
  status = false,
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
    if (id) {
      setLoading(true);
      dispatch(getData(id, "vehicle_accessories/brakes", id_token, false)).then(
        (res) => {
          setRowData(res.data);
          setLoading(false);
        }
      );
    }
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
      getRowData();
    }
    // eslint-disable-next-line
  }, [id, open]);

  return (
    <>
      {!calendar &&
        (rowId ? (
          <Tooltip
            placement="top"
            title={
              status && status === "Completed" ? "View" : "Edit Brake Service"
            }
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
          <Tooltip placement="top" title="Add New Brake Service">
            <Button
              startIcon={<AddIcon />}
              size={fullButton ? "medium" : "small"}
              color="primary"
              variant={fullButton ? "contained" : "outlined"}
              fullWidth={fullButton}
              onClick={openDialog}
            >
              {fullButton ? "Add New Brakes" : "Add"}
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Add New Brake Service">
            <IconButton onClick={openDialog}>
              <AddIcon />
            </IconButton>
          </Tooltip>
        ))}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {!isLoading &&
            (id
              ? "Brakes Service form for vehicle " +
                (rowData.vehicle && rowData.vehicle.vehicle_reg_no)
              : "Add New Brake Service")}
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <Progress />
          ) : (
            <BrakeServiceStepper
              handleClose={handleClose}
              dataPassed={rowData}
              rowId={id}
              vehicleId={vehicleId}
              setId={setId}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
