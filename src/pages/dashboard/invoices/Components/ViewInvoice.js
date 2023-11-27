import React from "react";
import {
  Grid,
  Box,
  Typography,
  InputBase,
  Card,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import moment from "moment";
import { connect } from "react-redux";
import { getData } from "src/Redux/actions/apiActions";
import Progress from "src/Components/Progress";

class ViewInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items_list: {},
      date: new Date(),
      array: [
        {
          names: "",
          price: "",
        },
      ],
      customer: "",
      vehicle: "",
      availableInfo: "",
      total_cash: "",
    };
    this.total_cash = 0;
  }
  componentDidMount = () => {
    this.props
      .getData(this.props.Id, "invoice", this.props.id_token, false)
      .then((res) => {
        this.setState(
          {
            total_cash: res.data.total_cash,
            items_list: res.data.items_list,
            vehicle: res.data.booking.vehicle.vehicle_reg_no,
            customer: res.data.customer.name,
            availableInfo: res.data.booking.id == null ? "Customer" : "Booking",
            date: res.data.date_generated,
          },
          () => {
            this.setState({ loaded: true });
          }
        );
      });
  };

  render() {
    if (!this.state.loaded) {
      return <Progress />;
    } else {
      return (
        <div>
          <Card>
            <Divider />
            <Table>
              <TableBody>
                {this.state.availableInfo === "Booking" ? (
                  <TableRow>
                    <TableCell>Vehicle Booked</TableCell>
                    <TableCell align="right">{this.state.vehicle}</TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell align="right">
                      <div> {this.state.customer}</div>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>Date Generated</TableCell>
                  <TableCell align="right">
                    {" "}
                    {moment(this.state.date).format("YYYY-MM-DD")}
                    {this.state.fine_type}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography
                style={{ textAlign: "center", paddingTop: "10px" }}
                variant="h6"
              >
                Items List
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{
                  textAlign: "left",
                  backgroundColor: "lightgray",
                  padding: "8px",
                }}
              >
                Item Name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                style={{
                  textAlign: "right",
                  backgroundColor: "lightgray",

                  padding: "8px",
                }}
              >
                Item Price
              </Typography>
            </Grid>
          </Grid>
          {Object.entries(this.state.items_list) &&
            Object.entries(this.state.items_list).map((row) => {
              return (
                <Grid container spacing={3}>
                  <Grid item xs={4}>
                    <InputBase
                      style={{ width: "100%", padding: "8px" }}
                      value={row[0]}
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "left" },
                      }}
                    ></InputBase>
                  </Grid>
                  <Grid item xs={8}>
                    <InputBase
                      style={{ width: "100%", padding: "8px" }}
                      value={row[1]}
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                    ></InputBase>
                  </Grid>
                </Grid>
              );
            })}
          <Grid container spacing={3}>
            <Grid item xs={6}></Grid>
            <Grid style={{ paddingBottom: "0px" }} item xs={6}>
              <hr
                className="dividerOutlook"
                style={{
                  color: "#e0e0e0",
                  height: "1px",
                  backgroundColor: "#e0e0e0",
                }}
              ></hr>
            </Grid>
            <Grid style={{ paddingTop: "0px" }} item xs={12}>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  borderRadius: "5px",
                }}
              >
                <InputBase
                  style={{ paddingRight: "8px" }}
                  value={this.state.total_cash}
                  id="outlined-basic"
                  inputProps={{
                    readOnly: true,
                    style: { textAlign: "right" },
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    // user
    id_token: state.user.id_token,
  };
};

export default connect(mapStateToProps, {
  getData,
})(ViewInvoice);
