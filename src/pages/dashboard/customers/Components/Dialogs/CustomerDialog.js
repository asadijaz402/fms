import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import CustomerForm from "../Forms/CustomerForm";
import {
  AddCircleOutlineRounded as AddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

export default function CustomerDialog({ rowId, data }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {rowId ? (
        <Tooltip placement="top" title="Edit Customer">
          <IconButton
            size="small"
            onClick={() => {
              setOpen(true);
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip placement="top" title="Add New Customer">
          <IconButton
            size="small"
            onClick={() => {
              setOpen(true);
            }}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          {rowId ? "Edit " : "Add "}
          Customer Details
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <CustomerForm
              handleClose={() => setOpen(false)}
              data={data}
              rowId={rowId}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
