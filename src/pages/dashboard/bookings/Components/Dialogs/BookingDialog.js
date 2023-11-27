import React, { useState } from "react";
import { ListAlt as ViewIcon } from "@mui/icons-material";
import {
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import BookingCard from "../BookingCard/BookingCard";

export default function BookingDialog({ rowId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip placement="top" title="View Booking Details">
        <Button
          disableElevation
          variant="contained"
          size="small"
          color="info"
          onClick={() => {
            setOpen(true);
          }}
          startIcon={<ViewIcon />}
        >
          Details
        </Button>
      </Tooltip>

      <Dialog
        open={open}
        fullWidth
        maxWidth="md"
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Booking Details</DialogTitle>
        <DialogContent>
          <BookingCard handleClose={() => setOpen(false)} rowId={rowId} />
        </DialogContent>
      </Dialog>
    </>
  );
}
