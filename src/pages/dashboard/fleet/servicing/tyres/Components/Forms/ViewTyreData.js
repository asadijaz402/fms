import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  TextField,
  InputAdornment,
  Switch,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import moment from "moment";
import { searchData } from "src/Redux/actions/apiActions";
import Autocomplete from "@mui/lab/Autocomplete";
import { Search as SearchIcon } from "@mui/icons-material";
import { connect } from "react-redux";

function TyreData(props) {
  let garageList = useSelector((state) => state.api.garage);
  let manufacturersServicing = useSelector(
    (state) => state.api.manufacturersServicing
  );
  const [value, setValue] = useState({});
  const [serviceBy, setBy] = useState(false);
  const [serviceAt, setAt] = useState(false);
  const [garage, setGarage] = useState({});
  useEffect(() => {
    if (props.value) {
      setValue(props.value);
      if (!props.value.customer) {
        setBy(true);
      } else {
        setBy(false);
      }
      if (props.value.garage_manufacturer) {
        setGarage(
          manufacturersServicing.find(
            (option) => option.id === props.value.garage_manufacturer
          )
        );
        setAt(true);
      } else {
        setGarage(
          garageList.find((option) => option.id === props.value.garage)
        );
        setAt(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  value.front_left ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="front_left"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        disabled
                        checked={true}
                        name="front_left"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="front_left"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      disabled
                      checked={false}
                      name="front_left"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Front Left"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  value.front_right ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="front_right"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        disabled
                        checked={true}
                        name="front_right"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="front_right"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      disabled
                      checked={false}
                      name="front_right"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Front Right"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.rear_left ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="rear_left"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        disabled
                        checked={true}
                        name="rear_left"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="rear_left"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      disabled
                      checked={false}
                      name="rear_left"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Rear Left"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.rear_right ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="rear_right"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        disabled
                        checked={true}
                        name="rear_right"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="rear_right"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      disabled
                      checked={false}
                      name="rear_right"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Rear Right"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            name="tyre_size"
            label="Tyres Size"
            variant="outlined"
            value={value.tyre_size}
            fullWidth
            disabled={value.method === "done"}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            InputProps={{ readOnly: true }}
            label="Due Date"
            name="due_date"
            value={moment(value.due_date).format("YYYY-MM-DDTHH:mm:ssZ")}
            inputVariant="outlined"
            style={{ width: "100%", marginTop: "25px" }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            InputProps={{ readOnly: true }}
            label="Date Completed"
            name="date_time_completed"
            value={moment(value.date_time_completed).format(
              "YYYY-MM-DDTHH:mm:ssZ"
            )}
            inputVariant="outlined"
            style={{ width: "100%", marginTop: "25px" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            type="number"
            name="mileage"
            label="Mileage"
            variant="outlined"
            value={value.mileage}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Cost"
            fullWidth={true}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ width: "100%" }}
            value={value.cost}
            type="number"
            InputLabelProps={{ shrink: true }}
            name="cost"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            name="number_of_tyres"
            label="Number of Tyres"
            variant="outlined"
            value={value.number_of_tyres}
            InputLabelProps={{ shrink: true }}
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            name="status"
            label="Service Status"
            variant="outlined"
            value={value.status}
            InputLabelProps={{ shrink: true }}
            fullWidth
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Tyre service done at Garage or Dealer Garage
            </FormLabel>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Garage</Grid>
              <Grid item>
                <Switch disabled checked={serviceAt} name="checkedC" />
              </Grid>
              <Grid item>Dealer</Grid>
            </Grid>
          </FormControl>

          {serviceAt ? (
            <>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                name="garage_manufacturer"
                label="Select Dealer Garage"
                variant="outlined"
                style={{ marginTop: "16px" }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={garage && garage.manufacturer_name}
              ></TextField>
              <br />
              <br />
            </>
          ) : (
            <>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                name="garage"
                label="Select Garage"
                variant="outlined"
                fullWidth
                style={{ marginTop: "16px" }}
                InputLabelProps={{ shrink: true }}
                value={garage && garage.garage_name}
              ></TextField>
              <br />
              <br />
            </>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tyre service done by</FormLabel>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Customer</Grid>
              <Grid item>
                <Switch disabled checked={serviceBy} name="checkedC" />
              </Grid>
              <Grid item>Driver</Grid>
            </Grid>
          </FormControl>

          {serviceBy ? (
            <>
              <TextField
                inputProps={{
                  readOnly: true,
                }}
                name="employee_name"
                label="Driver"
                variant="outlined"
                style={{ marginTop: "16px" }}
                value={value.employee_name}
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={value.method === "done"}
                SelectProps={{
                  native: true,
                }}
              />
            </>
          ) : props.value.customer ? (
            <TextField
              style={{ marginTop: "16px" }}
              InputProps={{
                readOnly: true,
              }}
              label="Customer Name"
              variant="outlined"
              value={props.value.customer.name}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          ) : (
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={value.options ? value.options : [""]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Customer"
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    readOnly: true,
                    type: "search",
                    startAdornment: (
                      <InputAdornment position="start" className="searchIcons">
                        <SearchIcon style={{ fill: "#545454" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    //   user
    id_token: state.user.id_token,
  };
};

export default connect(mapStateToProps, {
  searchData,
})(TyreData);
