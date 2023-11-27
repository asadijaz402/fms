import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { connect } from "react-redux";
import {
  listData,
  createUpdateData,
  editUpdateData,
  resetApi,
  changeValue,
} from "src/Redux/actions/apiActions";
import VehicleSearch from "./VehicleSearch";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Progress from "src/Components/Progress";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "auto",
    padding: "15px",
  },
}));

function EditVORGarageForm(props) {
  const [value, setValue] = useState({
    id: "",
    name: "",
    address: "",
    city: "",
    country: "",
    other_details: "",
    vehicle_list: [],
    // vehicle_list_reg: [],
  });
  const [isloading, setloading] = useState(false);
  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <form onSubmit={(e) => console.log(e)}>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  required="true"
                  name="name"
                  label="Name"
                  variant="outlined"
                  value={value.name}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="address"
                  label="Address"
                  variant="outlined"
                  value={value.address}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="city"
                  label="City"
                  variant="outlined"
                  value={value.city}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  name="country"
                  label="Country"
                  variant="outlined"
                  value={value.country}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item md={12} xs={12}>
                <TextField
                  name="other_details"
                  multiline="true"
                  rows="3"
                  label="Other Details"
                  variant="outlined"
                  value={value.other_details}
                  fullWidth
                  onChange={(e) => handleChange(e)}
                />
              </Grid>
              <Grid item md={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleNext()}
                  style={{ float: "right" }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </form>
        );
      case 1:
        return (
          <>
            {isloading ? (
              <Progress />
            ) : (
              <VehicleSearch
                setData={setValue}
                data={value}
                setVehName={props.setVehName}
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}
          </>
        );

      default:
        return "Unknown stepIndex";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    if (props.dataPassed) {
      setValue({
        id: props.dataPassed.rowData[0],
        name: props.dataPassed.rowData[2],
        address: props.dataPassed.rowData[3],
        city: props.dataPassed.rowData[4],
        country: props.dataPassed.rowData[5],
        other_details: props.dataPassed.rowData[6],
        vehicle_list: props.dataPassed.rowData[1],
      });
      if (props.viewList) {
        setActiveStep(1);
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (value.name) {
          setActiveStep(1);
          // props.setStep(1);
        }
        break;
      case 1:
        setloading(true);
        var vehicle_list = [];
        vehicle_list = value.vehicle_list.map((val) => {
          return val.id;
        });
        const data = {
          name: value.name,
          address: value.address,
          city: value.city,
          country: value.country,
          vehicles: vehicle_list,
          other_details: value.other_details,
        };
        if (!props.dataPassed) {
          props
            .createUpdateData(
              data,
              "vehicle/vortype/create",
              props.id_token,
              false
            )
            .then((res) => {
              let status_response = res;
              if (props.setmounted) {
                props.setmounted(false);
              }

              props.handleClose();
              if (
                status_response &&
                (status_response.status === 201 ||
                  status_response.status === 200)
              ) {
                store.addNotification({
                  title: "Request for adding a new VOR entry ",
                  message: "VOR entry added Successfully",
                  type: "success", // 'default', 'success', 'info', 'warning'
                  container: "bottom-left", // where to position the notifications
                  animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
                  animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
                  dismiss: {
                    duration: 5000,
                  },
                });
              } else {
                store.addNotification({
                  title: "Request for adding new VOR entry",
                  message: "VOR entry was Not added Successfully",
                  type: "danger", // 'default', 'success', 'info', 'warning'
                  container: "bottom-left", // where to position the notifications
                  animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
                  animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
                  dismiss: {
                    duration: 5000,
                  },
                });
              }
            });
        } else {
          props
            .editUpdateData(
              data,
              "vehicle/vortype",
              value.id,
              props.id_token,
              false
            )
            .then((res) => {
              let status_response = res;
              if (props.setmounted) {
                props.setmounted(false);
              }
              props.changeValue("mounted", false);
              props.handleClose();
              if (
                status_response &&
                (status_response.status === 201 ||
                  status_response.status === 200)
              ) {
                store.addNotification({
                  title: "Request for Editing VOR entry",
                  message: "VOR entry edited Successfully",
                  type: "success", // 'default', 'success', 'info', 'warning'
                  container: "bottom-left", // where to position the notifications
                  animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
                  animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
                  dismiss: {
                    duration: 5000,
                  },
                });
              } else {
                store.addNotification({
                  title: "Request for Editing VOR entry",
                  message: "VOR entry was not edited Successfully",
                  type: "danger", // 'default', 'success', 'info', 'warning'
                  container: "bottom-left", // where to position the notifications
                  animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
                  animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
                  dismiss: {
                    duration: 5000,
                  },
                });
              }
            });
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // props.setStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key={0}>
          <StepLabel>VOR Details</StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel>Vehicles</StepLabel>
        </Step>
      </Stepper>

      <div>
        <hr className="dividerOutlook" />
        <div>{getStepContent(activeStep)}</div>
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

export default connect(mapStateToProps, {
  listData,
  createUpdateData,
  editUpdateData,
  resetApi,
  changeValue,
})(EditVORGarageForm);
