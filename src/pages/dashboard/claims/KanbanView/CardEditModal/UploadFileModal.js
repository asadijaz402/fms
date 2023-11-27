import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ActionButton from "./ActionButton";
import { File as FileIcon } from "react-feather";
import Files from "./Files";

export default function FormDialog({ card, ...props }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ActionButton icon={FileIcon} onClick={handleClickOpen}>
        Attachments
      </ActionButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            File should not greate than <b>8mb</b>.
          </DialogContentText>
          <Files card={card} files={card.attachments} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
