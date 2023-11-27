import React from "react";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Button,
  useTheme,
  TextField,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";

export default function DeliveryForm({
  value,
  onChange,
  handleNext,
  handleBack,
}) {
  const theme = useTheme();
  const handleChange = (e) => {
    onChange({
      target: {
        name: e.target.name,
        value: e.target.checked,
      },
    });
  };

  return (
    <>
      <Grid container spacing={6} style={{ paddingBottom: theme.spacing(2) }}>
        <Grid item md={6} style={{ textAlign: "left" }}>
          <Box>
            <Box mt={2}>
              <Typography variant="h6">Delivery Info (Not required)</Typography>
            </Box>
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value.deliver}
                    onChange={handleChange}
                    name="deliver"
                    color="primary"
                  />
                }
                label="Will vehicle be delivered by us?"
              />
            </Box>
            {value.deliver && (
              <>
                <Box mt={2}>
                  <TextField
                    label="Delivery Address"
                    multiline
                    value={value.delivery_address}
                    rows={4}
                    fullWidth
                    helperText="Location where vehicle will be delivered."
                    variant="outlined"
                    name="delivery_address"
                    onChange={onChange}
                  />
                </Box>
                <Box mt={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField fullWidth {...props} />
                      )}
                      label="Delivery Date"
                      name="delivery_date"
                      value={value.deliver_date}
                      required
                      fullWidth
                      onChange={(e) =>
                        onChange({
                          target: {
                            name: "delivery_date",
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
                </Box>
              </>
            )}
          </Box>
        </Grid>
        <Grid item md={6} style={{ textAlign: "left" }}>
          <Box>
            <Box mt={2}>
              <Typography variant="h6">
                Collection Info (Not required)
              </Typography>
            </Box>
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value.collection_at_depot}
                    onChange={handleChange}
                    name="collection_at_depot"
                    color="primary"
                  />
                }
                label="Will vehicle be collected by us?"
              />
            </Box>
            {value.collection_at_depot && (
              <>
                <Box mt={2}>
                  <TextField
                    label="Collection Address"
                    multiline
                    value={value.collection_address}
                    rows={4}
                    fullWidth
                    helperText="Location from where vehicle will be collected."
                    variant="outlined"
                    name="collection_address"
                    onChange={onChange}
                  />
                </Box>
                <Box mt={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField fullWidth {...props} />
                      )}
                      label="Collection Date"
                      value={value.collectionDate}
                      name="collectionDate"
                      required
                      fullWidth
                      onChange={(e) =>
                        onChange({
                          target: {
                            name: "collectionDate",
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
                </Box>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Box
        mt={4}
        mb={2}
        width={"100%"}
        display="flex"
        flexDirection="row-reverse"
      >
        <Box>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        </Box>
        <Box mr={1}>
          <Button onClick={handleBack}>Back</Button>
        </Box>
      </Box>
    </>
  );
}
