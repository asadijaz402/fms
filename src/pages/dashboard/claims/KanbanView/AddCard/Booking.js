import React, { useState, useEffect } from "react";
import {
  makeStyles,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2, 0, 2, 0),
  },
}));

export default function BasicTextFields({
  vehicle_id,
  handleBack,
  handleNext,
  handleChange,
  ...props
}) {
  const classes = useStyles();
  const id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);

  const get_booking_data = () => {
    dispatch(getData(vehicle_id, "rental_records/list", id_token, false))
      .then((res) => {
        if (res.data.booking_id) {
          setValues(res.data);
          setLoading(false);
          props.setValue(res.data);
        } else {
          setValues({ vehicle: vehicle_id });
          handleNext();
        }
      })
      .catch((err) => {
        handleNext();
      });
  };

  useEffect(() => {
    get_booking_data();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className={classes.root} noValidate autoComplete="off">
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid container spacing={2}>
          <Grid item xx={12} sm={6} md={6} lg={6}>
            <TextField
              name="booking_id"
              id="outlined-basic"
              label="Booking Number"
              value={values.booking_id}
              fullWidth
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xx={12} sm={6} md={6} lg={6}>
            <TextField
              name="vehicle_id"
              id="outlined-basic"
              label="Vehicle Reg Number"
              value={values.vehicle.vehicle_reg_no}
              fullWidth
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xx={12} sm={6} md={6} lg={6}>
            <TextField
              name="booking_id"
              id="outlined-basic"
              label="Customer Name"
              value={values.customer.name}
              fullWidth
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xx={12} sm={6} md={6} lg={6}>
            <TextField
              name="booking_id"
              id="outlined-basic"
              label="Email"
              value={values.customer.email}
              fullWidth
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xx={12} sm={6} md={6} lg={6}>
            <TextField
              name="booking_id"
              id="outlined-basic"
              label="Contact Number"
              value={values.customer.mobile}
              fullWidth
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xx={12} sm={6} md={6} lg={6}>
            <TextField
              name="booking_id"
              id="outlined-basic"
              label="KashFlow Ref Number"
              value={values.customer.kashflow_code}
              fullWidth
              variant="outlined"
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid style={{ textAlign: "right" }} item xs={12}>
            <div>
              <Button onClick={handleBack}>Back</Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                Next
              </Button>
            </div>
          </Grid>
        </Grid>
      )}
    </form>
  );
}
