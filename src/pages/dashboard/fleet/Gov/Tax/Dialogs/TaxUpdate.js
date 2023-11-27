import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, Button, DialogContent } from "@mui/material";
import ChangeTax from "../forms/ChangeTax";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../../slices/CustomSlices/actions/apiActions";
import Progress from "../../../../../../Components/Progress";

export default function TaxUpdate({
  rowId,
  calendar = false,
  modalOpen = false,
  handleCloseModal = false,
}) {
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [rowData, setRowData] = useState({});
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
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
    setOpen(true);
    dispatch(getData(rowId, "vehicle_accessories/tax", id_token, false)).then(
      (res) => {
        setRowData(res.data);
        setLoading(false);
      }
    );
  };

  return (
    <>
      {!calendar && (
        <Button
          variant="contained"
          disableElevation
          size="small"
          color="primary"
          onClick={openDialog}
        >
          Update Status
        </Button>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {!isLoading &&
            "Update Tax Status for " + rowData.tax.vehicle.vehicle_reg_no}
        </DialogTitle>

        <DialogContent>
          {isLoading ? (
            <Progress />
          ) : (
            <ChangeTax
              handleClickClose={handleClose}
              rowId={rowData.id}
              vehicleId={rowData.tax.vehicle.id}
              regNo={rowData.tax.vehicle.vehicle_reg_no}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
