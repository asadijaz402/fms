import React, { useState } from "react";
import {
  makeStyles,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  TextField,
  FormControl,
  Select,
  Chip,
} from "@mui/material";
import TextDivider from "src/Components/TextDivider";
import { connect } from "react-redux";
import {
  listData,
  changeValue,
  editUpdateData,
  createUpdateData,
} from "src/Redux/actions/apiActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Progress from "src/Components/Progress";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { DateTimePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

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
  },
}));

function BookMotForm(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [garageName, handlegarageName] = useState("");
  const [garageAddress, handlegarageAddress] = useState("");
  const [contactName, handlecontactName] = useState("");
  const [contactNumber, handlecontactNumber] = useState("");
  const [addNewGarage, handleAddNewGarage] = useState(false);
  const [selectGarage, handleSelectGarage] = useState(false);
  const [customerDetails, handleCustomerDetails] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleChangeGarageName = (event) => {
    handlegarageName(event.target.value);
  };

  const handleChangeGarageAddress = (event) => {
    handlegarageAddress(event.target.value);
  };

  const handleChangeContactName = (event) => {
    handlecontactName(event.target.value);
  };

  const handleChangeContactNumber = (event) => {
    handlecontactNumber(event.target.value);
  };

  const handleChangeSelectGarage = (event) => {
    if (event.target.value === "add_new") {
      handleAddNewGarage(true);
    } else {
      handlegarageName("");
      handlegarageAddress("");
      handlecontactName("");
      handlecontactNumber("");
      handleSelectGarage(event.target.value);
    }
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              label="Booking Date and Time"
              inputVariant="outlined"
              value={selectedDate}
              style={{ width: "100%", marginTop: "25px" }}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
        );
      case 1:
        return (
          <div style={{ width: "100%" }}>
            <h3 style={{ marginBottom: "0" }}>Vehicle Info</h3>
            <p style={{ marginTop: "20px", fontSize: "18px" }}>
              <b>Reg Number:</b> {props.regNo}
              <br />
              <b>V5C Number:</b> N/A
            </p>
            <Grid container spacing={3}>
              <Grid item md={12}>
                <h3>Garage Info</h3>
              </Grid>
              {addNewGarage && (
                <>
                  <Button
                    onClick={() => {
                      handleAddNewGarage(false);
                    }}
                    style={{ marginBottom: "20px" }}
                    variant="outlined"
                  >
                    Choose Existing Garage
                  </Button>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        label="Garage Name"
                        fullWidth
                        variant="outlined"
                        value={garageName}
                        onChange={handleChangeGarageName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        label="Garage Address"
                        variant="outlined"
                        fullWidth={true}
                        value={garageAddress}
                        onChange={handleChangeGarageAddress}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        label="Contact Name"
                        fullWidth={true}
                        variant="outlined"
                        value={contactName}
                        onChange={handleChangeContactName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <TextField
                        label="Contact Number"
                        fullWidth={true}
                        variant="outlined"
                        value={contactNumber}
                        onChange={handleChangeContactNumber}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              {!addNewGarage && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <FormControl variant="outlined" fullWidth>
                      <Select
                        native
                        name="vehicle_type_id"
                        label="Garage Name"
                        onChange={handleChangeSelectGarage}
                      >
                        <option value="...">...</option>
                        <option value={"add_new"}>Add New Garage</option>
                        {props.garageList &&
                          props.garageList.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.garage_name}
                            </option>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </div>
        );
      case 2:
        return (
          <div style={{ width: "100%" }}>
            <div style={{ marginTop: "2vh" }}></div>
            {isLoading ? (
              <Progress />
            ) : (
              <Grid container spacing={2}>
                {customerDetails.length !== 0 && (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={6}
                    lg={6}
                    className="cardsDetail"
                  >
                    <TextDivider dataToPass={{ text: "Customer Info" }} />
                    <p style={{ fontSize: "14px" }}>
                      <b>Name:</b>{" "}
                      {customerDetails && customerDetails.customer.name}
                      <br />
                      <b>Email:</b>{" "}
                      {customerDetails && customerDetails.customer.email}
                      <br />
                      <b>Mobile Number:</b>{" "}
                      {customerDetails && customerDetails.customer.mobile}
                      <br />
                      <b>Passport Number:</b>{" "}
                      {customerDetails &&
                        customerDetails.customer.passport_number}
                      <br />
                      <b>Bank Acc Number:</b>{" "}
                      {customerDetails &&
                        customerDetails.customer.bank_account_number}
                      <br />
                      <b>Insurance Number:</b>{" "}
                      {customerDetails &&
                        customerDetails.customer.insurance_number}
                      <br />
                      <b>Driving License Number:</b>{" "}
                      {customerDetails &&
                        customerDetails.customer.driving_license}
                      <br />
                      <b>Business Reg Number:</b>{" "}
                      {customerDetails &&
                        customerDetails.customer.business_reg_number}
                      <br />
                    </p>
                  </Grid>
                )}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  className="cardsDetail"
                >
                  <TextDivider dataToPass={{ text: "Vehicle Info" }} />
                  <p style={{ fontSize: "14px" }}>
                    <b>Reg Number:</b> {props.regNo}
                    <br />
                    <b>V5C:</b> <br />
                  </p>
                </Grid>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <FormControlLabel
                    value="end"
                    control={
                      <Checkbox
                        color="primary"
                        checked={checked}
                        onChange={handleChange}
                        name="checked"
                      />
                    }
                    label="I confirm that I want to book this MOT."
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
            )}
          </div>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    switch (activeStep) {
      case 0:
        if (selectedDate) {
          setActiveStep(1);
        }
        break;
      case 1:
        if (
          garageAddress.length > 0 &&
          garageName.length > 0 &&
          contactName.length > 0 &&
          contactNumber.length > 0
        ) {
          const data = {
            garage_name: garageName,
            garage_address: garageAddress,
            contact_person_name: contactName,
            contact_person_number: contactNumber,
          };
          props
            .createUpdateData(data, "garage", props.id_token, false)
            .then((res) => {
              handleSelectGarage(res.data.id);
              props.listData("garage", props.id_token, false);
            });
          setActiveStep(2);
        } else if (selectGarage) {
          setActiveStep(2);
        }

        break;
      case 2:
        if (checked) {
          setIsLoading(true);
          props
            .editUpdateData(
              {
                test_date: selectedDate,
                booking_time: " ",
                employee_name: "",
                booked_by: 1,
                garage: selectGarage,
                customer:
                  customerDetails.length !== 0
                    ? customerDetails.customer.id
                    : "",
                test_booked: true,
                status: "Pending Validation",
              },
              "mot",
              props.dataPassed[0],
              props.id_token,
              false
            )
            .then((res) => {
              let status_response = res;
              props.listData("mot", props.id_token, false).then((res) => {
                props.handleClose();
                props.setmounted(false);
                if (
                  status_response &&
                  (status_response.status === 201 ||
                    status_response.status === 200)
                ) {
                  store.addNotification({
                    title: (
                      <Chip
                        color="primary"
                        style={{
                          width: "285px",
                          color: "white",
                        }}
                        label={props.regNo}
                      ></Chip>
                    ),
                    message: "MOT form booked Successfully",
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
                    title: (
                      <Chip
                        color="primary"
                        style={{
                          width: "285px",
                          color: "white",
                        }}
                        label={props.regNo}
                      ></Chip>
                    ),
                    message: "MOT form was Not booked successfully",
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
            });
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      props.changeValue("depot", null);
      props.changeValue("vehicle", null);
    }

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step key={0}>
          <StepLabel>Date & Time</StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel>Booking Details</StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel>Review</StepLabel>
        </Step>
      </Stepper>
      <div>
        <hr className="dividerOutlook" />
        {!isLoading ? (
          <div>
            {getStepContent(activeStep)}
            <div style={{ marginTop: "50px", textAlign: "right" }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === 2 ? "Book MOT" : "Next"}
              </Button>
            </div>
          </div>
        ) : (
          <div>{getStepContent(activeStep)}</div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    //   user
    id_token: state.user.id_token,
    //   api

    garageList: state.api["garage"],
    hiringData: state.api["gethiring-customer"],
  };
};

export default connect(mapStateToProps, {
  listData,
  changeValue,
  createUpdateData,
  editUpdateData,
})(BookMotForm);
