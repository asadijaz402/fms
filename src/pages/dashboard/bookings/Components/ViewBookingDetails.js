import React, { Component } from "react";
import {
  Select,
  Table,
  CardHeader,
  Divider,
  TableRow,
  TableCell,
  TableBody,
  FormControl,
  InputLabel,
  MenuItem,
  Card,
  Typography,
  Chip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import moment from "moment";
import { connect } from "react-redux";
import { listData, getData } from "src/Redux/actions/apiActions";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Progress from "src/Components/Progress";
class ViewBookingDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelOpen: false,
      dataToPass: "",
      isLoaded: true,
      currentIndex: "",
      statusValue: "Booked",
      isloading: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      dataToPass: this.props.dataFromRow,
      statusValue: this.props.dataFromRow.status,
    });
  };
  handleChangeStatus = (e) => {
    this.setState({
      statusValue: e.target.value,
      isloading: true,
    });

    this.props
      .getData(
        e.target.value,
        "hiring/rental_records/update/" + this.props.dataFromRow.id,
        this.props.id_token,
        false
      )
      .then((res) => {
        console.log(this.props.dataToPass.vehicle.vehicle_reg_no);
        let status_response = res;
        this.props
          .listData("hiring/booking-list", this.props.id_token, false)
          .then((res) => {
            this.props.handleClose();
            this.props.setmounted(false);
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
                    label={this.props.dataToPass.vehicle.vehicle_reg_no}
                  ></Chip>
                ),
                message: "Status changed successfully",
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
                    label={this.props.dataToPass.vehicle.vehicle_reg_no}
                  ></Chip>
                ),
                message: "Status change request was not successfull",
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
    return (
      <div style={{ paddingBottom: "20px" }}>
        {this.state.isLoaded && this.state.isloading ? (
          <Progress />
        ) : (
          <div>
            <FormControl
              variant="outlined"
              fullWidth
              style={{ marginBottom: "20px" }}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.statusValue}
                fullWidth
                onChange={this.handleChangeStatus}
                label="Change Status"
              >
                <MenuItem value={"Booked"}>Booked</MenuItem>
                <MenuItem value={"Initial_Payment"}>Initial Payment</MenuItem>
                <MenuItem value={"Pre-check"}>Pre-check</MenuItem>
                <MenuItem value={"Confirmed"}>Confirmed</MenuItem>
                <MenuItem value={"Hired"}>Hired</MenuItem>
                <MenuItem value={"Returned"}>Returned</MenuItem>
                <MenuItem value={"Return_Precheck"}>Return Precheck</MenuItem>
                <MenuItem value={"Complete_payment"}>Complete Payment</MenuItem>
                <MenuItem value={"Complete"}>Complete</MenuItem>
              </Select>
            </FormControl>
            <Card>
              <CardHeader title="Vehicle Details" />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>Registration Number</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {this.props.dataFromRow.vehicle.vehicle_reg_no}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Hire Status</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {this.props.dataFromRow.vehicle.hire_status ? (
                          <div style={{ color: "#18CD70" }}>
                            <CheckCircleIcon />
                          </div>
                        ) : (
                          <div style={{ color: "#FF4570" }}>
                            <CancelIcon />
                          </div>
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Divider />
              <CardHeader title="Customer Details" />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {this.props.dataFromRow.customer.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Email</b>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {this.props.dataFromRow.customer.email}
                      </Typography>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <b>Contact</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {"+44" +
                          this.props.dataFromRow.customer.mobile.toString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <Divider />
              <CardHeader title="Booking Details" />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>Start Date</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {this.props.dataFromRow.start_date}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>End Date</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {this.props.dataFromRow.end_date}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Booking ID</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {" "}
                        {this.props.dataFromRow.booking_id}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Method</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {" "}
                        {this.props.dataFromRow.request_method}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Divider />
              <CardHeader title="Delivery / Collection Details" />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <b>We Deliver</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {this.props.dataFromRow.delivery ? (
                          <div style={{ color: "#18CD70" }}>
                            <CheckCircleIcon />
                          </div>
                        ) : (
                          <div style={{ color: "#FF4570" }}>
                            <CancelIcon />
                          </div>
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {this.props.dataFromRow.delivery && (
                    <>
                      <TableRow>
                        <TableCell>
                          <b>Delivery Address</b>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="textSecondary">
                            {this.props.dataFromRow.delivery_details &&
                              this.props.dataFromRow.delivery_details
                                .delivery_address}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Delivery Time</b>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="textSecondary">
                            {this.props.dataFromRow.delivery_details &&
                              moment(
                                this.props.dataFromRow.delivery_details
                                  .delivery_date,
                                "YYYY-MM-DDTHH:mm:ssZ"
                              ).format("DD/MM/YYYY")}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}

                  <TableRow>
                    <TableCell>
                      <b>We Collect</b>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="body2" color="textSecondary">
                        {this.props.dataFromRow.collection_at_depot ? (
                          <div style={{ color: "#18CD70" }}>
                            <CheckCircleIcon />
                          </div>
                        ) : (
                          <div style={{ color: "#FF4570" }}>
                            <CancelIcon />
                          </div>
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  {this.props.dataFromRow.collection_at_depot && (
                    <>
                      <TableRow>
                        <TableCell>
                          <b>Collection Address</b>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="textSecondary">
                            {this.props.dataFromRow.collection_details &&
                              this.props.dataFromRow.collection_details
                                .collection_address}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Collection Time</b>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" color="textSecondary">
                            {this.props.dataFromRow.collection_details &&
                              moment(
                                this.props.dataFromRow.collection_details
                                  .collection_date,
                                "YYYY-MM-DDTHH:mm:ssZ"
                              ).format("DD/MM/YYYY")}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </>
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // user
    id_token: state.user.id_token,
  };
};

export default connect(mapStateToProps, {
  listData,
  getData,
})(ViewBookingDetails);
