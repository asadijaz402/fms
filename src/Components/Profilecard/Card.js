import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../slices/CustomSlices/actions/apiActions";
import {
  Button,
  Dialog,
  Box,
  DialogTitle,
  DialogActions,
  Grid,
  DialogContent,
  IconButton,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  Close as CloseIcon,
  Details as DetailsIcon,
} from "@mui/icons-material";
import BasicInfo from "./BasicInfo";
import Status from "./Status";
import Details from "./Details";
import CopyToClipboard from "./CopyToClipboard";

export default function ProfileCard({ vehicle_id, reg_number }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);
  const [vehicle, setVehicle] = useState({});
  const [vehicleCheck, setVehicleCheck] = useState([]);
  const theme = useTheme();

  const openDialog = () => {
    setOpen(true);
    setLoading(true);
    dispatch(
      getData(vehicle_id, "vehicle/vehicle-check", id_token, false)
    ).then((res) => {
      setVehicleCheck(res.data);
    });
    dispatch(getData(vehicle_id, "vehicle/vehicle", id_token, false)).then(
      (res) => {
        setVehicle(res.data);
        setLoading(false);
      }
    );
  };

  return (
    <>
      <Box display="flex" sx={{ width: "100%" }} alignItems="center">
        <Button
          size="small"
          color="primary"
          variant="outlined"
          sx={{ display: "block" }}
          onClick={openDialog}
        >
          {reg_number}
        </Button>
        <Box ml={1}>
          <CopyToClipboard size="small" value={reg_number} />
        </Box>
      </Box>

      <Dialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>Vehicle #{reg_number}</DialogTitle>
        {!loading && (
          <IconButton
            style={{
              position: "absolute",
              right: theme.spacing(2),
              top: theme.spacing(2),
            }}
            onClick={() => setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        )}

        <DialogContent>
          {loading ? (
            <Box style={{ textAlign: "center" }} m={2}>
              <CircularProgress />
            </Box>
          ) : (
            <Box mb={2}>
              <Status vehiclecheck={vehicleCheck} vehicle={vehicle} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <BasicInfo vehicle={vehicle} />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Details vehicle={vehicle} />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Box m={2}>
            <Button
              color="primary"
              startIcon={<DetailsIcon fontSize="small" />}
              sx={{ mt: 1 }}
              variant="contained"
              href={"/fleet/vehicle/" + vehicle_id + "/details"}
            >
              Show more details
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}
