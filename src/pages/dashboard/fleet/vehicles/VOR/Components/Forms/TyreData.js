import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Switch,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddGarage from "src/forms/AddGarage";
import AddManufacturerGarage from "src/forms/AddManufacturerGarage";
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
  const [butDisable, setDisable] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleChangeCheckBox = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.checked,
    });
  };
  const handleChangeCheck = (e, func) => {
    if (func === "By") {
      setBy(e.target.checked);
      setValue({ ...value, customer: "", employee_name: "" });
    } else if (func === "At") {
      setAt(e.target.checked);
      setValue({ ...value, garage_manufacturer: "", garage: "" });
    }
  };
  const handleChangeTime = (e, name) => {
    setValue({ ...value, [name]: moment(e).format("YYYY-MM-DDTHH:mm:ssZ") });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
    setDisable(true);
    props.setValue(value);
  };
  const onDropChangeNew = (event, values) => {
    console.log("search called");
    let options = [];
    let customerId = "";
    props
      .searchData(values, "customer/search", props.id_token, false)
      .then((res) => {
        console.log(res);
        res.data.results.filter((row) => {
          if (row.name === values) {
            console.log(row.id);
          }

          return row.name === values
            ? (customerId = row.id)
            : (customerId = "");
        });
        res.data.results.length !== 0 &&
          res.data.results.map((data) => {
            return (options = [...options, data.name]);
          });
        console.log(customerId);
        setValue({
          ...value,
          options: options,
          loading: false,
          customer: customerId,
        });
      });
  };

  useEffect(() => {
    if (props.value) {
      setValue(props.value);
      if (!props.value.customer) {
        setBy(true);
      } else {
        setBy(false);
      }
      if (props.value.garage_manufacturer) {
        setAt(true);
      } else {
        setAt(false);
      }
    }

    if (submit) {
      console.log("submit called");
      props.handleNext();
    }
  }, [props.value]);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
                        checked={true}
                        onChange={handleChangeCheckBox}
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
                      checked={false}
                      onChange={handleChangeCheckBox}
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
                        checked={true}
                        onChange={handleChangeCheckBox}
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
                      checked={false}
                      onChange={handleChangeCheckBox}
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
                        checked={true}
                        onChange={handleChangeCheckBox}
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
                      checked={false}
                      onChange={handleChangeCheckBox}
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
                        checked={true}
                        onChange={handleChangeCheckBox}
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
                      checked={false}
                      onChange={handleChangeCheckBox}
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
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Due Date"
              disabled={value.method === "done"}
              name="due_date"
              value={value.due_date}
              inputVariant="outlined"
              style={{ width: "100%", marginTop: "25px" }}
              onChange={(e) => handleChangeTime(e, "due_date")}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={6} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Date Completed"
              name="date_time_completed"
              disabled={value.method === "done"}
              value={value.date_time_completed}
              inputVariant="outlined"
              style={{ width: "100%", marginTop: "25px" }}
              onChange={(e) => handleChangeTime(e, "date_time_completed")}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            type="number"
            name="mileage"
            label="Mileage"
            variant="outlined"
            value={value.mileage}
            fullWidth
            disabled={value.method === "done"}
            SelectProps={{
              native: true,
            }}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            label="Cost"
            fullWidth={true}
            disabled={value.method === "done"}
            variant="outlined"
            style={{ width: "100%" }}
            value={value.cost}
            type="number"
            InputLabelProps={{ shrink: true }}
            name="cost"
            onChange={(e) => handleChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            select
            name="number_of_tyres"
            label="Number of Tyres"
            variant="outlined"
            value={value.number_of_tyres}
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled={value.method === "done"}
            SelectProps={{
              native: true,
            }}
            onChange={(e) => handleChange(e)}
          >
            <option> </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            select
            name="status"
            label="Service Status"
            variant="outlined"
            value={value.status}
            InputLabelProps={{ shrink: true }}
            fullWidth
            disabled={value.method === "done"}
            SelectProps={{
              native: true,
            }}
            onChange={(e) => handleChange(e)}
          >
            <option value="Not Booked">Not Booked</option>
            <option value="Booked">Booked</option>
            <option value="Pending Validation">Pending Validation</option>
            <option value="Completed">Completed</option>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Tyre service done at Garage or Dealer Garage
            </FormLabel>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Garage</Grid>
              <Grid item>
                <Switch
                  checked={serviceAt}
                  onChange={(e) => handleChangeCheck(e, "At")}
                  name="checkedC"
                />
              </Grid>
              <Grid item>Dealer</Grid>
            </Grid>
          </FormControl>

          {serviceAt ? (
            <>
              <TextField
                select
                disabled={value.method === "done"}
                name="garage_manufacturer"
                label="Select Dealer Garage"
                variant="outlined"
                style={{ marginTop: "16px" }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={value.garage_manufacturer}
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => handleChange(e)}
              >
                <option value=""></option>
                {manufacturersServicing &&
                  manufacturersServicing.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.manufacturer_name}
                    </option>
                  ))}
              </TextField>
              <br />
              <br />
              {value.method !== "done" && (
                <AddManufacturerGarage handleChange={handleChange} />
              )}
            </>
          ) : (
            <>
              <TextField
                disabled={value.method === "done"}
                select
                name="garage"
                label="Select Garage"
                variant="outlined"
                fullWidth
                style={{ marginTop: "16px" }}
                value={value.garage}
                InputLabelProps={{ shrink: true }}
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => handleChange(e)}
              >
                <option value=""></option>
                {garageList &&
                  garageList.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.garage_name}
                    </option>
                  ))}
              </TextField>
              <br />
              <br />
              {value.method !== "done" && (
                <AddGarage handleChange={handleChange} />
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Tyre service done by</FormLabel>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Customer</Grid>
              <Grid item>
                <Switch
                  checked={serviceBy}
                  onChange={(e) => handleChangeCheck(e, "By")}
                  name="checkedC"
                />
              </Grid>
              <Grid item>Driver</Grid>
            </Grid>
          </FormControl>

          {serviceBy ? (
            <>
              <TextField
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
                onChange={(e) => handleChange(e)}
              />
            </>
          ) : (
            <Autocomplete
              value={props.value.customer?.name}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={value.options ? value.options : [""]}
              onInputChange={onDropChangeNew}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Customer"
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
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

      <div style={{ marginTop: "50px", textAlign: "right" }}>
        <Button
          disabled={value.method === "put" || value.method === "done"}
          onClick={() => props.handleBack()}
          style={{ marginRight: "16px" }}
        >
          Back
        </Button>
        <Button
          disabled={
            butDisable ||
            value.method === "done" ||
            (!value.garage && !value.garage_manufacturer) ||
            (!value.customer && !value.employee_name)
          }
          variant="contained"
          color="primary"
          type="submit"
        >
          Finish
        </Button>
      </div>
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
