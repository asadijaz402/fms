import React from "react";
import { Grid, TextField, Button, Box, Chip } from "@mui/material";
import { connect } from "react-redux";
import {
  listData,
  editUpdateData,
} from "../../../../../Redux/actions/apiActions";
import Progress from "../../../../../Components/Progress";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class EditDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.data.name,
      email: this.props.data.email,
      mobile: this.props.data.mobile,
      passport_number: this.props.data.passport_number,
      bank_account_number: this.props.data.bank_account_number,
      driving_license: this.props.data.driving_license,
      business_reg_number: this.props.data.business_reg_number,
      insurance_number: this.props.data.insurance_number,
      dp: "",
    };
  }

  onHandleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  createNewDrivers = () => {
    let data = this.props.data;
    data = {
      ...data,
      name: this.state.name,
      email: this.state.email,
      mobile: this.state.mobile,
      passport_number: this.state.passport_number,
      bank_account_number: this.state.bank_account_number,
      driving_license: this.state.driving_license,
      insurance_number: this.state.insurance_number,
      business_reg_number: this.state.business_reg_number,
    };
    this.setState({
      loading: true,
    });
    this.props
      .editUpdateData(
        data,
        "criver",
        this.props.data.id,
        this.props.id_token,
        false
      )
      .then((res) => {
        let status_response = res;
        this.props
          .listData("/driver/list", this.props.id_token, false)
          .then((res) => {
            this.props.setmounted(false);
            this.setState({
              loading: false,
              dp: this.props.new_Driver.id,
            });
            this.props.handleClose();
            if (
              status_response &&
              (status_response.status === 201 || status_response.status === 200)
            ) {
              store.addNotification({
                title: (
                  <Chip
                    color="primary"
                    style={{
                      width: "285px",
                      color: "white",
                    }}
                    label={this.state.name}
                  ></Chip>
                ),
                message: "Driver entry edited Successfully",
                type: "success", // 'default', 'success', 'info', 'warning'
                container: "bottom-left", // where to position the notifications
                animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
                animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
                dismiss: {
                  duration: 5000,
                },
              });
              // this.props.listData("alldrivers", this.props.id_token, false);
            } else {
              store.addNotification({
                title: (
                  <Chip
                    color="primary"
                    style={{
                      width: "285px",
                      color: "white",
                    }}
                    label={this.state.name}
                  ></Chip>
                ),
                message: "Driver entry was Not edited Successfully",
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
  };
  render() {
    if (this.state.loading) {
      return <Progress />;
    } else {
      return (
        <div>
          <form autoComplete="on" onSubmit={this.createNewDrivers}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  required
                  variant="outlined"
                  label="Name"
                  id="component-simple"
                  value={this.state.name}
                  style={{ width: "100%" }}
                  onChange={this.onHandleChange("name")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  required
                  style={{ width: "100%" }}
                  label="Email"
                  variant="outlined"
                  id="component-simple"
                  value={this.state.email}
                  type="email"
                  onChange={this.onHandleChange("email")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  required
                  style={{ width: "100%" }}
                  label="Mobile Number"
                  variant="outlined"
                  id="component-simple"
                  value={this.state.mobile}
                  onChange={this.onHandleChange("mobile")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Passport Number"
                  id="component-simple"
                  variant="outlined"
                  value={this.state.passport_number}
                  style={{ width: "100%" }}
                  onChange={this.onHandleChange("passport_number")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Bank Account Number"
                  id="component-simple"
                  variant="outlined"
                  value={this.state.bank_account_number}
                  style={{ width: "100%" }}
                  onChange={this.onHandleChange("bank_account_number")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Insurance Number"
                  id="component-simple"
                  value={this.state.insurance_number}
                  style={{ width: "100%" }}
                  variant="outlined"
                  onChange={this.onHandleChange("insurance_number")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Driving License"
                  id="component-simple"
                  variant="outlined"
                  value={this.state.driving_license}
                  style={{ width: "100%" }}
                  onChange={this.onHandleChange("driving_license")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Business Registration Number"
                  id="component-simple"
                  value={this.state.business_reg_number}
                  variant="outlined"
                  style={{ width: "100%" }}
                  onChange={this.onHandleChange("business_reg_number")}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    borderRadius: "5px",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: "25px" }}
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    // user
    id_token: state.user.id_token,

    // api

    new_driver: state.api.post_data,
  };
};

export default connect(mapStateToProps, {
  listData,
  editUpdateData,
})(EditDriver);
