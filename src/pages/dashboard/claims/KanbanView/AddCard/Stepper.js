import React, { useState } from "react";
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createUpdateData,
  listData,
} from "../../../../../slices/CustomSlices/actions/apiActions";
import { updateBoard } from "../../../../../slices/CustomSlices/actions/kanbanActions";
import VehicleSearch from "./VehicleSearch";
import Booking from "./Booking";
import AccidentInfo from "./AccidentInfo";
import { useStore } from "react-redux";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Select Vehicle",
    "Confirm Booking and Customer",
    "Details",
    "Finish",
  ];
}

export default function HorizontalLabelPositionBelowStepper({ handleClose }) {
  const location = useLocation();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [value, setValue] = useState({
    incident_date_time: new Date(),
  });
  const id_token = useSelector((state) => state.user.id_token);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const allStore = useStore();
  const specificStore = allStore.getState();

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div style={{ textAlign: "center" }}>
            <VehicleSearch
              handleChange={handleChange}
              handleNext={handleNext}
            />
          </div>
        );
      case 1:
        return (
          <Booking
            vehicle_id={value.vehicle}
            setValue={setValue}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <AccidentInfo
            handleChange={handleChange}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 3:
        let data = {
          vehicle: value.vehicle.id ? value.vehicle.id : value.vehicle,
          accident:
            "/claims/Breakdown/table" === location.pathname ? false : true,
          state: "Open for Action",
          notes: {
            notes: value.notes,
            members: [],
            comments: [],
            checklist: [],
          },
          booking: value.id ? value.id : null,
          driver_name: value.driver_name,
          date: value.incident_date_time,
          location: value.location,
          customer_opinion: value.customer_opinion,
          damages: "",
          type: value.type,
        };
        let dis = true;
        if (dis) {
          dis = false;
          dispatch(createUpdateData(data, "claims/boa", id_token, false)).then(
            (res) => {
              dispatch(listData("claims/boa/all", id_token, false)).then(
                (boa) => {
                  dispatch(listData("account/staff/all", id_token, false)).then(
                    (staff) => {
                      dispatch(updateBoard(boa.data, staff.data));
                      handleClose();
                    }
                  );
                }
              );
              const apiStore = specificStore.api.vehicle;

              let regNo = null;

              apiStore.map((veh) => {
                if (veh.id === value.vehicle) {
                  console.log(veh);
                  regNo = veh.vehicle_reg_no;
                  return veh.vehicle_reg_no;
                }
              });

              if (res && (res.status === 201 || res.status === 200)) {
                toast.success("Accident entry");
              } else {
                toast.error("There was an error adding accident entry added.");
              }
            }
          );
        }

        return (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>{getStepContent(activeStep)}</div>
        )}
      </div>
    </div>
  );
}
