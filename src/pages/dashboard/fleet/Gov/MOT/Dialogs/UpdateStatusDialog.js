import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Button,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import ChangeMot from "../Forms/ChangeMot";

export default function DeleteServiceDialog({ tableMeta }) {
  const [open, setOpen] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState({});

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (tableMeta.rowData.length !== 0) {
      setVehicleInfo(tableMeta.rowData[1].vehicle_id);
    }
  }, [tableMeta]);

  return (
    <>
      <Tooltip placement="top" title="Update Status">
        <Button
          size="small"
          variant="contained"
          disableElevation
          startIcon={<UpdateIcon />}
          color="primary"
          onClick={() => openDialog()}
        >
          Complete
        </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          Update MOT Status for{" "}
          {Object.keys(vehicleInfo).length !== 0 && vehicleInfo.vehicle_reg_no}
        </DialogTitle>
        <DialogContent>
          <ChangeMot
            handleClose={handleClose}
            vehicle_id={Object.keys(vehicleInfo).length !== 0 && vehicleInfo.id}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
