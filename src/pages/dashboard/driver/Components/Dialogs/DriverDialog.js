import React, { useState } from "react";
import {
  Tooltip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Button,
} from "@mui/material";
import DriverForm from "../Forms/DriverForm";
import {
  AddCircleOutlineRounded as AddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";

export default function DriverDialog({ rowId, data, type = "default" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      {rowId ? (
        type === "assign" ? (
          <Button
            onClick={() => {
              setOpen(true);
            }}
            size="small"
            variant="outlined"
          >
            Assign
          </Button>
        ) : (
          <Tooltip placement="top" title="Edit Driver">
            <IconButton
              size="small"
              onClick={() => {
                setOpen(true);
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <Tooltip title="Add New Driver">
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
          Driver Details
        </DialogTitle>
        <DialogContent>
          <Box mb={2}>
            <DriverForm
              handleClose={() => setOpen(false)}
              data={data}
              rowId={rowId}
              step={type === "assign" ? 1 : 0}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
