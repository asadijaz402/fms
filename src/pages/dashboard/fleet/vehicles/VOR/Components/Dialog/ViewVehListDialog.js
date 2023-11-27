import React, { useState } from "react";
import { Dialog, DialogContent, Tooltip, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditVORGarageForm from "../Forms/EditVORGarageForm";

export default function EditTyresBookingDialog({ tableMeta, history }) {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip placement="top" title="View VOR">
        <IconButton size="small" color="secondary" onClick={() => openDialog()}>
          <VisibilityIcon />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <EditVORGarageForm
            handleClose={handleClose}
            dataPassed={tableMeta}
            history={history}
            viewList={true}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
