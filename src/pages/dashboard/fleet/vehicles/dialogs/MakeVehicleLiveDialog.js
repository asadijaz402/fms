import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tooltip,
  Button,
  IconButton,
  TextField,
  CircularProgress,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { ReplayRounded as ReplayIcon } from "@mui/icons-material";
import useDeFleetVehicle from "./useDeFleetVehicle";

export default function MakeVehicleLive() {
  let [regNo, setRegNo] = useState("");
  const { isLoading, responseMessage, makeCall, setOpen, open } =
    useDeFleetVehicle(regNo, false);

  const handleChange = (e) => {
    setRegNo(e.target.value);
  };

  return (
    <>
      <Tooltip title="Make Vehicle Live">
        <IconButton onClick={() => setOpen(true)}>
          <ReplayIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Make Existing Vehicle Live {isLoading && <CircularProgress />}
        </DialogTitle>
        <form onSubmit={(e) => makeCall(e)}>
          <DialogContent style={{ paddingBottom: "20px" }}>
            <DialogContentText sx={{ pb: 2 }}>
              You can change de-fleeted vehicles to live from here.
            </DialogContentText>
            <TextField
              required
              name="Reg No"
              autoFocus
              error={responseMessage}
              helperText={
                responseMessage
                  ? responseMessage
                  : "Vehicle Registration number you want to make live."
              }
              label="Registration Number"
              variant="outlined"
              value={regNo}
              fullWidth
              onChange={(e) => handleChange(e)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Close</Button>
            <Button type="submit" variant="contained" color="primary">
              Make Live
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
