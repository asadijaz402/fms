import React, { useState } from "react";
import { Dialog, DialogTitle, IconButton, Tooltip } from "@mui/material";
import { ListRounded as ViewIcon } from "@mui/icons-material";
import ViewPrecheckHistory from "../ViewPrechecksList";

export default function ViewHistoryDialog({ vehicleId, tableMeta }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip placement="top" title="View Precheck History">
        <IconButton onClick={() => setOpen(true)} size="small" color="info">
          <ViewIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={() => {
          setOpen(false);
        }}
        open={open}
      >
        <DialogTitle>View Precheck Hisotory</DialogTitle>
        <ViewPrecheckHistory tableMeta={tableMeta} vehicleId={vehicleId} />
      </Dialog>
    </>
  );
}
