import React, { Component } from "react";
import { Grid } from "@mui/material";
import moment from "moment";
import Button from "@mui/material/Button";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { connect } from "react-redux";
import {
  listData,
  putData,
} from "../../../../../../slices/CustomSlices/actions/apiActions";
import Progress from "../../../../../../Components/Progress";
import {
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";

class ChangeTax extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      payment_date: new Date(),
      start_date: new Date(),
      end_date: new Date(),
      cost: 0,
      agree: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isloading: true });
    const AVform_data = new FormData();
    AVform_data.append(
      "payment_date",
      moment(this.state.payment_date).format("YYYY-MM-DD")
    );
    AVform_data.append(
      "start_date",
      moment(this.state.start_date).format("YYYY-MM-DDTHH:mm:ssZ")
    );
    AVform_data.append(
      "end_date",
      moment(this.state.end_date).format("YYYY-MM-DDTHH:mm:ssZ")
    );
    AVform_data.append("cost", this.state.cost);
    AVform_data.append("vehicle", this.props.vehicleId);
    this.props
      .putData(
        AVform_data,
        "vehicle_accessories/tax/" + this.props.rowId,
        this.props.id_token,
        false
      )
      .then((res) => {
        this.props.listData("tax", this.props.id_token, false).then((res) => {
          this.props.handleClickClose();
        });
      });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <form autoComplete="on" onSubmit={this.handleSubmit}>
          {this.state.isloading ? (
            <Progress />
          ) : (
            <>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField required fullWidth {...props} />
                      )}
                      label="Start Date"
                      required
                      name="start_date"
                      fullWidth
                      value={this.state.start_date}
                      onChange={(e) =>
                        this.handleChange({
                          target: { name: "start_date", value: e },
                        })
                      }
                      SelectProps={{
                        native: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                      // onChange={(newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField required fullWidth {...props} />
                      )}
                      required
                      label="End Date"
                      name="end_date"
                      fullWidth
                      value={this.state.end_date}
                      onChange={(e) =>
                        this.handleChange({
                          target: { name: "end_date", value: e },
                        })
                      }
                      SelectProps={{
                        native: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                      // onChange={(newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      renderInput={(props) => (
                        <TextField required fullWidth {...props} />
                      )}
                      required
                      label="Payment Date"
                      name="payment_date"
                      value={this.state.payment_date}
                      fullWidth
                      onChange={(e) =>
                        this.handleChange({
                          target: { name: "payment_date", value: e },
                        })
                      }
                      SelectProps={{
                        native: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                      // onChange={(newValue) => {
                      //   setValue(newValue);
                      // }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    required
                    id="cost"
                    value={this.state.cost}
                    label="Cost"
                    name="cost"
                    variant="outlined"
                    onChange={(e) => {
                      this.handleChange(e);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl component="fieldset">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.agree}
                          onChange={() =>
                            this.setState({ agree: !this.state.agree })
                          }
                          name="agree"
                        />
                      }
                      label="I am sure that the status is Paid and the entries are set correctly above"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <div style={{ marginTop: "50px", textAlign: "right" }}>
                <Button
                  style={{ marginRight: "16px" }}
                  onClick={this.props.handleClickClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!this.state.agree}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    id_token: state.user.id_token,
  };
};
export default connect(mapStateToProps, {
  listData,

  putData,
})(ChangeTax);
