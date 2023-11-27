import React, { useState, useEffect } from "react";
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

export default function WeCollect({ data, setData, updateBookings, disabled }) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setCheck(data[0].collection_at_depot);
    // eslint-disable-next-line
  }, [data]);

  const handleCheck = (e) => {
    setCheck(e.target.checked);
    setData((data) => {
      if (e.target.checked) {
        return data.map((row) => {
          return {
            ...row,
            collection_at_depot: e.target.checked,
          };
        });
      } else {
        return data.map((row) => {
          return {
            ...row,
            collection_at_depot: e.target.checked,
            collection_details: {},
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
          collection_details: {
            ...row.collection_details,
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
                We Collect (details)
              </Typography>
            </Box>
            <Box mt={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Collection Address"
                    multiline
                    value={data[0].collection_details.collection_address}
                    rows={4}
                    fullWidth
                    required
                    helperText="Location where vehicle will be collected."
                    variant="outlined"
                    name="collection_address"
                    onChange={onChange}
                    InputProps={{
                      readOnly: disabled,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField fullWidth {...props} />
                      )}
                      label="Collection Date"
                      name="collection_date"
                      value={moment
                        .utc(data[0].collection_details.collection_date)
                        .local()
                        .toDate()}
                      required
                      fullWidth
                      onChange={(e) =>
                        onChange({
                          target: {
                            name: "collection_date",
                            value: moment(e).format("YYYYY-MM-DDTHH:mm:ssZ"),
                          },
                        })
                      }
                      SelectProps={{
                        native: true,
                      }}
                      InputProps={{
                        readOnly: disabled,
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
                    value={data[0].collection_details.notes}
                    rows={4}
                    fullWidth
                    variant="outlined"
                    name="notes"
                    onChange={onChange}
                    InputProps={{
                      readOnly: disabled,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={3} display="flex">
              <Box flexGrow={1}>
                <FormControlLabel
                  control={<Checkbox checked={check} onChange={handleCheck} />}
                  label="We Collect"
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
                We Collect (info)
              </Typography>
            </Box>
            <Box display="flex">
              <Box flexGrow={1}>
                <FormControlLabel
                  control={<Checkbox checked={check} onChange={handleCheck} />}
                  label="We Collect"
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
