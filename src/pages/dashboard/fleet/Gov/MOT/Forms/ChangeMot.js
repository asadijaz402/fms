import React, { useState } from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { putData } from "../../../../../../slices/CustomSlices/actions/apiActions";
import {
  FormControl,
  FormControlLabel,
  Button,
  Grid,
  CircularProgress,
  Checkbox,
  useTheme,
  TextField,
} from "@mui/material";

export default function ChangeMOT({ handleClose, vehicle_id }) {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({
    agree: false,
  });
  const theme = useTheme();
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {
      ...value,
      payment_date: moment(value.payment_date).format("YYYY-MM-DDTHH:mm:ssZ"),
      start_date: moment(value.start_date).format("YYYY-MM-DDTHH:mm:ssZ"),
      end_date: moment(value.end_date).format("YYYY-MM-DDTHH:mm:ssZ"),
      vehicle_id: vehicle_id,
    };
    dispatch(
      putData(data, "vehicle_accessories/MOT/manual", id_token, false)
    ).then((res) => {
      setLoading(false);
      handleClose();
    });
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} styles={{ marginTop: theme.spacing(2) }}>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField fullWidth {...props} />}
                label="Start Date"
                name="start_date"
                value={value.start_date}
                onChange={(e) =>
                  handleChange({
                    target: { name: "start_date", value: e },
                  })
                }
                inputProps={{
                  readOnly: value.status === "Completed",
                }}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => (
                  <TextField required fullWidth {...props} />
                )}
                label="End Date"
                name="end_date"
                value={value.end_date}
                onChange={(e) =>
                  handleChange({
                    target: { name: "end_date", value: e },
                  })
                }
                inputProps={{
                  readOnly: value.status === "Completed",
                }}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField fullWidth {...props} />}
                label="Payment Date"
                name="payment_date"
                value={value.payment_date}
                onChange={(e) =>
                  handleChange({
                    target: { name: "payment_date", value: e },
                  })
                }
                inputProps={{
                  readOnly: value.status === "Completed",
                }}
                SelectProps={{
                  native: true,
                }}
                InputLabelProps={{ shrink: true }}
                // onChange={(newValue) => {
                //   setValue(newValue);
                // }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              value={value.cost}
              label="Cost"
              name="cost"
              variant="outlined"
              onChange={(e) => {
                handleChange(e);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value.agree}
                    onChange={() => setValue({ ...value, agree: !value.agree })}
                    name="agree"
                  />
                }
                label="I am sure that the status is Paid and the entries are set correctly above"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                marginTop: theme.spacing(4),
                marginBottom: theme.spacing(2),
                textAlign: "right",
              }}
            >
              <Button style={{ marginRight: "16px" }} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                disabled={!value.agree}
                variant="contained"
                color="primary"
                type="submit"
              >
                Save
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    );
  }
}
