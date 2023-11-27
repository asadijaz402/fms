import React, { useEffect, useState } from "react";
import {
  CardContent,
  Card,
  Typography,
  Box,
  Checkbox,
  Grid,
  TextField,
  Button,
  FormControlLabel,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";

export default function WeDeliver({ data, setData, updateBookings, disabled }) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(data[0].deliver);
    // eslint-disable-next-line
  }, [data]);

  const handleCheck = (e) => {
    setCheck(e.target.checked);
    setData((data) => {
      if (e.target.checked) {
        return data.map((row) => {
          return {
            ...row,
            deliver: e.target.checked,
          };
        });
      } else {
        return data.map((row) => {
          return {
            ...row,
            deliver: e.target.checked,
            delivery_details: {},
          };
        });
      }
    });
  };

  const onChange = (e) => {
    setData(
      data.map((row) => {
        return {
          ...row,
          delivery_details: {
            ...row.delivery_details,
            [e.target.name]: e.target.value,
          },
        };
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBookings();
  };

  if (check) {
    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography color="textSecondary" variant="overline">
                We Deliver (details)
              </Typography>
            </Box>
            <Box mt={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Delivery Address"
                    multiline
                    value={data[0].delivery_details?.delivery_address}
                    rows={4}
                    fullWidth
                    InputProps={{
                      readOnly: disabled,
                    }}
                    required
                    helperText="Location where vehicle will be delivered."
                    variant="outlined"
                    name="delivery_address"
                    onChange={onChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField fullWidth {...props} />
                      )}
                      label="Delivery Date"
                      name="delivery_date"
                      value={data[0].delivery_details?.delivery_date}
                      required
                      InputProps={{
                        readOnly: disabled,
                      }}
                      fullWidth
                      onChange={(e) =>
                        onChange({
                          target: {
                            name: "deliver_date",
                            value: moment(e).format("YYYY-MM-DDTHH:mm:ssZ"),
                          },
                        })
                      }
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
                <Grid item xs={12}>
                  <TextField
                    label="Notes"
                    multiline
                    value={data[0].delivery_details?.notes}
                    rows={4}
                    fullWidth
                    variant="outlined"
                    name="notes"
                    InputProps={{
                      readOnly: disabled,
                    }}
                    onChange={onChange}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={3} display="flex">
              <Box flexGrow={1}>
                <FormControlLabel
                  control={<Checkbox checked={check} onChange={handleCheck} />}
                  label="We deliver"
                  disabled={disabled}
                />
              </Box>
              <Box>
                <Button
                  disabled={disabled}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    );
  } else {
    return (
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box>
              <Typography color="textSecondary" variant="overline">
                We Deliver (info)
              </Typography>
            </Box>
            <Box display="flex">
              <Box flexGrow={1}>
                <FormControlLabel
                  control={<Checkbox checked={check} onChange={handleCheck} />}
                  label="We deliver"
                  disabled={disabled}
                />
              </Box>
              <Box>
                <Button
                  disabled={disabled}
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Update
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    );
  }
}
