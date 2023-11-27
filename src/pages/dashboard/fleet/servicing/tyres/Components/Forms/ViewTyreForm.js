import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/material";

import { connect } from "react-redux";
import ViewTyreData from "./ViewTyreData";
import "react-notifications-component/dist/theme.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    padding: "15px",
  },
}));

function ViewTyreForm(props) {
  const [value, setValue] = useState({
    due_date: new Date(),
    method: "post",
  });

  const classes = useStyles();
  useEffect(() => {
    setValue({
      id: props.dataPassed.id,
      vehicle: props.dataPassed.vehicle.id,
      due_date: props.dataPassed.due_date,
      cost: props.dataPassed.cost,
      date_time_completed: value.date_time_completed,
      garage: props.dataPassed.garage,
      status: props.dataPassed.status,
      garage_manufacturer: props.dataPassed.manufacturers_servicing,
      number_of_tyres: props.dataPassed.number_of_tyres,
      employee_name: props.dataPassed.employee_name,
      mileage: props.dataPassed.current_mileage,
      customer: props.dataPassed.customer,
      method: props.dataPassed.status === "Completed" ? "done" : "put",
      front_left: props.dataPassed.front_left,
      front_right: props.dataPassed.front_right,
      rear_left: props.dataPassed.rear_left,
      rear_right: props.dataPassed.rear_right,
      tyre_size: props.dataPassed.tyre_size,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <div>
        <hr className="dividerOutlook" />
        <div>
          <ViewTyreData value={value} handleClose={props.handleClose} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //   user
    tyres: state.api.tyres,
    id_token: state.user.id_token,
  };
};

export default connect(mapStateToProps, {})(ViewTyreForm);
