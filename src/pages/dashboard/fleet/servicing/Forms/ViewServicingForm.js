import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/material";
import { connect } from "react-redux";
import ViewServicingData from "./ViewServicingData";
import "react-notifications-component/dist/theme.css";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    padding: "15px",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textAlign: "center",
  },
}));

function ViewServicingForm(props) {
  const [value, setValue] = useState({});
  const classes = useStyles();
  useEffect(() => {
    setValue({
      id: props.dataPassed.id,
      vehicle: props.dataPassed.vehicle.id,
      due_date: moment(props.dataPassed.due_date).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      ),
      cost: props.dataPassed.cost,
      service_date: moment(props.dataPassed.service_date).format(
        "YYYY-MM-DDTHH:mm:ssZ"
      ),
      garage: props.dataPassed.garage,
      status: props.dataPassed.status,
      garage_manufacturer: props.dataPassed.manufacturers_servicing,
      service_number: props.dataPassed.service_number,
      oil_filter: props.dataPassed.oil_filter,
      oil_change: props.dataPassed.oil_change,
      fuel_filter: props.dataPassed.fuel_filter,
      air_filter: props.dataPassed.air_filter,
      pollen_filter: props.dataPassed.pollen_filter,
      additions_service: props.dataPassed.additions_service,
      method: props.method,
    });
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <hr className="dividerOutlook" />
        <div>
          <ViewServicingData value={value} handleClose={props.handleClose} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //   user
    id_token: state.user.id_token,
    arrayAppend: state.api.log_array,
    //api
    service: state.api.service,
    json_object: state.api.json_object,
  };
};

export default connect(mapStateToProps, {})(ViewServicingForm);
