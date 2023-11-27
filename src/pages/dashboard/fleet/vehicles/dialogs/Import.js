import React from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
} from '@mui/material';
import UploadIcon from '../../../../../icons/Upload';
import AddBulkVehicle from '../forms/AddBulkVehicle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        color="primary"
        startIcon={<UploadIcon fontSize="small" />}
        sx={{ m: 1 }}
        onClick={handleClickOpen}
      >
        Import
      </Button>
      <Dialog
        open={open}
        maxWidth={'sm'}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <DialogTitle>Import Data</DialogTitle>
        <DialogContent>
          <AddBulkVehicle handleClose={handleClose} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
