import React, {
  useState,
  // useEffect
} from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import AvailableVehicleSearchTable from "../Tables/AvailableVehicleSearchTable";

export default function SearchTableAvailableVehicle({ value, onChange }) {
  const [open, setOpen] = useState(true);

  // useEffect(() => {
  //   if (booking) {
  //     setOpen(false);
  //   }
  // }, [booking]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
      >
        Show Available Vehicles
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>Available Vehicle List</DialogTitle>
        <DialogContent>
          <AvailableVehicleSearchTable
            handleClose={handleClose}
            onChange={onChange}
            values={value}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
