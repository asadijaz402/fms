import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  Tooltip,
  DialogContentText,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../../slices/CustomSlices/actions/apiActions";
import AddIcon from "@mui/icons-material/Add";
import BookMOTStepper from "../Stepper/BookMOTStepper";

export default function BookMOTDialog({
  rowId,
  calendar = false,
  modalOpen = false,
  handleCloseModal = false,
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const fetchData = () => {
    setLoading(true);
    dispatch(getData(rowId, "vehicle_accessories/MOT", id_token, false)).then(
      (res) => {
        setData(res.data);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    if (modalOpen) {
      fetchData();
    }
    setOpen(modalOpen);
    // eslint-disable-next-line
  }, [modalOpen]);

  const handleClose = () => {
    if (handleCloseModal) {
      handleCloseModal(false);
    }
    setOpen(false);
  };

  const openDialog = () => {
    fetchData();

    // setRegNo(tableMeta.rowData[1].vehicle_id.vehicle_reg_no);
    setOpen(true);
  };

  return (
    <>
      {!calendar && (
        <Tooltip placement="right" title="Book MOT">
          <Button
            startIcon={<AddIcon />}
            size="small"
            variant="contained"
            disableElevation
            color="primary"
            onClick={() => openDialog()}
          >
            Book MOT
          </Button>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Book MOT {!loading && data.mot.vehicle_id.vehicle_reg_no + "?"}
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress />
          ) : (
            <DialogContentText>
              <BookMOTStepper handleClose={handleClose} rowId={rowId} />
            </DialogContentText>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
