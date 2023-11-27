import React from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { connect } from "react-redux";
import {
  listData,
  createUpdateData,
} from "../../../../slices/CustomSlices/actions/apiActions";
import Progress from "../../../../Components/Progress";
import toast from "react-hot-toast";

class AddDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      mobile: "",
      passport_number: "",
      bank_account_number: "",
      driving_license: "",
      business_reg_number: "",
      insurance_number: "",
      dp: "",
    };
  }

  onHandleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  createNewDrivers = () => {
    this.setState({
      loading: true,
    });
    const data = new FormData();
    data.append("name", this.state.name);
    data.append("email", this.state.email);
    data.append("mobile", this.state.mobile);
    data.append("passport_number", this.state.passport_number);
    data.append("bank_account_number", this.state.bank_account_number);
    data.append("driving_license", this.state.driving_license);
    data.append("insurance_number", this.state.insurance_number);
    data.append("business_reg_number", this.state.business_reg_number);
    this.props
      .createUpdateData(data, "/driver", this.props.id_token, false)
      .then((res) => {
        toast.success("New driver added.");
        this.setState({
          loading: false,
        });
        this.props.handleClose();
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
                <Box pt={1}>
                  <TextField
                    required
                    variant="outlined"
                    label="Name"
                    name="name"
                    id="component-simple"
                    value={this.state.name}
                    style={{ width: "100%" }}
                    onChange={this.onHandleChange("name")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box pt={1}>
                  <TextField
                    required
                    name="email"
                    label="Email"
                    variant="outlined"
                    id="component-simple"
                    value={this.state.email}
                    type="email"
                    style={{ width: "100%" }}
                    onChange={this.onHandleChange("email")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    required
                    name="contact_number"
                    label="Mobile Number"
                    variant="outlined"
                    id="component-simple"
                    value={this.state.mobile}
                    style={{ width: "100%" }}
                    onChange={this.onHandleChange("mobile")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    label="Passport Number"
                    id="component-simple"
                    name="passport"
                    variant="outlined"
                    value={this.state.passport_number}
                    style={{ width: "100%" }}
                    onChange={this.onHandleChange("passport_number")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    label="Bank Account Number"
                    id="component-simple"
                    variant="outlined"
                    name="account_number"
                    value={this.state.bank_account_number}
                    style={{ width: "100%" }}
                    onChange={this.onHandleChange("bank_account_number")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    label="Insurance Number"
                    id="component-simple"
                    name="insurance_number"
                    value={this.state.insurance_number}
                    style={{ width: "100%" }}
                    variant="outlined"
                    onChange={this.onHandleChange("insurance_number")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    label="Driving License"
                    id="component-simple"
                    name="driver_license"
                    variant="outlined"
                    value={this.state.driving_license}
                    style={{ width: "100%" }}
                    onChange={this.onHandleChange("driving_license")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Box>
                  <TextField
                    label="Business Registration Number"
                    id="component-simple"
                    value={this.state.business_reg_number}
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={this.onHandleChange("business_reg_number")}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    borderRadius: "5px",
                  }}
                >
                  <Button variant="contained" color="primary" type="submit">
                    Save and Create
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
  createUpdateData,
})(AddDriver);
