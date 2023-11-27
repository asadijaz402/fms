import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  Grid,
  TextField,
  Divider,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormLabel,
  Switch,
} from "@mui/material";

import { connect } from "react-redux";

import moment from "moment";

function ServiceData(props) {
  let garageList = useSelector((state) => state.api.garage);
  let manufacturersServicing = useSelector(
    (state) => state.api.manufacturersServicing
  );

  const [serviceAt, setAt] = useState(false);
  const [value, setValue] = useState({});
  const [garage, setGarage] = useState({});
  useEffect(() => {
    if (props.value) {
      setValue(props.value);
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
  }, [props.value]);

  return (
    <form>
      <Grid container spacing={2}>
        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  value.oil_change ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="oil_change"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        checked={true}
                        disabled
                        name="oil_change"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="oil_change"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      checked={false}
                      disabled
                      name="oil_change"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Oil Change"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  value.oil_filter ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="oil_filter"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        checked={true}
                        disabled
                        name="oil_filter"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="oil_filter"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      checked={false}
                      disabled
                      name="oil_filter"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Oil Filter"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.fuel_filter ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="fuel_filter"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        checked={true}
                        disabled
                        name="fuel_filter"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="fuel_filter"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      checked={false}
                      disabled
                      name="fuel_filter"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Fuel Filter"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.air_filter ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="air_filter"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        checked={true}
                        disabled
                        name="air_filter"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="air_filter"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      checked={false}
                      disabled
                      name="air_filter"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Air Filter"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={
                  value.pollen_filter ? (
                    props.value.method === "done" ? (
                      <Checkbox
                        disabled
                        checked={true}
                        name="pollen_filter"
                        style={{ color: "tomato" }}
                      />
                    ) : (
                      <Checkbox
                        checked={true}
                        disabled
                        name="pollen_filter"
                        style={{ color: "tomato" }}
                      />
                    )
                  ) : props.value.method === "done" ? (
                    <Checkbox
                      disabled
                      checked={false}
                      name="pollen_filter"
                      style={{ color: "tomato" }}
                    />
                  ) : (
                    <Checkbox
                      checked={false}
                      disabled
                      name="pollen_filter"
                      style={{ color: "tomato" }}
                    />
                  )
                }
                label="Pollen Filter"
              />
            </FormGroup>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            multiline
            rows={5}
            label="Other Services"
            fullWidth={true}
            variant="outlined"
            style={{ width: "100%" }}
            value={value.additions_service}
            type="text"
            name="additions_service"
            readOnly={props.value.method === "done"}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            InputProps={{ readOnly: true }}
            label="Contact Date"
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
            label="Agreed Date"
            name="service_date"
            value={moment(value.service_date).format("YYYY-MM-DDTHH:mm:ssZ")}
            inputVariant="outlined"
            style={{ width: "100%", marginTop: "25px" }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            label="Cost"
            fullWidth={true}
            variant="outlined"
            style={{ width: "100%" }}
            value={value.cost}
            type="number"
            name="cost"
            readOnly
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <TextField
            InputProps={{
              readOnly: true,
            }}
            name="status"
            label="Service Status"
            variant="outlined"
            value={props.value.method === "post" ? "Booked" : value.status}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TextField
            label="Service Number"
            fullWidth={true}
            variant="outlined"
            style={{ width: "100%" }}
            value={value.service_number}
            type="text"
            name="service_number"
            readOnly
            InputProps={{
              readOnly: true,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Divider />

        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Garage or Dealer</FormLabel>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Garage</Grid>
              <Grid item>
                <Switch disabled checked={serviceAt} name="checkedC" />
              </Grid>
              <Grid item>Dealer</Grid>
            </Grid>
          </FormControl>
          <br />
          <br />
          {serviceAt ? (
            <>
              <TextField
                InputProps={{
                  readOnly: true,
                }}
                disabled={value.method === "done"}
                name="garage_manufacturer"
                label="Select Dealer Garage"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                fullWidth
                value={value.garage_manufacturer}
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
                value={value.garage}
                value={garage && garage.garage_name}
                InputLabelProps={{ shrink: true }}
              ></TextField>
              <br />
              <br />
            </>
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
    //api
    json_object: state.api.json_object,
  };
};

export default connect(mapStateToProps, {})(ServiceData);
