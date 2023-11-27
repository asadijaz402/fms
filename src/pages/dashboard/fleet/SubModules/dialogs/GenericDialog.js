import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import {
  AddCircleOutlineRounded as AddIcon,
  EditRounded as EditIcon,
} from "@mui/icons-material";
import {
  VehicleTypeForm,
  VehicleManufacturerForm,
  VehicleDepotForm,
  VehicleGroupForm,
  VehicleGarageForm,
  VehicleManufacturerGarageForm,
} from "../forms";

const Forms = (props) => {
  switch (props.name) {
    case "VehicleManufacturerGarage":
      return <VehicleManufacturerGarageForm {...props} />;
    case "VehicleGarage":
      return <VehicleGarageForm {...props} />;
    case "VehicleType":
      return <VehicleTypeForm {...props} />;
    case "VehicleManufacturer":
      return <VehicleManufacturerForm {...props} />;
    case "VehicleDepot":
      return <VehicleDepotForm {...props} />;
    case "VehicleGroup":
      return <VehicleGroupForm {...props} />;
    default:
      return (
        <Typography variant="body1" color="error">
          Error rendiring Form.
        </Typography>
      );
  }
};

export default function GenericDialog({
  id = false,
  form = "VehicleType",
  data,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  return (
    <>
      {id ? (
        <Tooltip placement="top" title="Edit">
          <IconButton size="small" variant="outlined" onClick={handleClickOpen}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add New">
          <IconButton onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Dialog open={open} onClose={handleClickClose}>
        <DialogTitle>{id ? "Edit " : "Add New "}</DialogTitle>
        <DialogContent>
          <Forms
            name={form}
            data={data}
            id={id}
            handleClickClose={handleClickClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
