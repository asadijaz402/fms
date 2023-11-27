import React, { Component } from "react";
import { connect } from "react-redux";
import { isUniversal, listData } from "src/Redux/actions/apiActions";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { CircularProgress } from "@mui/material";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  Tooltip,
  Grid,
  TextField,
  ButtonGroup,
} from "@mui/material";
import Alert from "@mui/lab/Alert";
import {
  ListAlt as ViewIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import ViewBookingDetails from "./ViewBookingDetails";
import ProfileCard from "src/Components/Profilecard/Profilecard";
import { NoRecord } from "src/Components/NoRecord";
class Tax extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyList: false,
      mounted: false,
      data: [],
      profileOpen: false,
      modelOpen: false,
      dataLoaded: false,
      bookingsList: "",
      numberOfDays: "7",
      selectedDate: new Date(),
      rowData: {},
      columns: [
        {
          label: "Booking ID",
          name: "key",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          label: "Reg Number",
          name: "reg_number",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          label: "Start Date",
          name: "start_date",
          options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return moment(value, "YYYY-MM-DDThh:mm").format(
                "ddd Do MMM YYYY (h:mm)"
              );
            },
          },
        },
        {
          label: "End Date",
          name: "end_date",
          options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return moment(value, "YYYY-MM-DDThh:mm").format(
                "ddd Do MMM YYYY (h:mm)"
              );
            },
          },
        },
        {
          label: "Customer Name",
          name: "customer_name",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          label: "We Collect",
          name: "we_collect",
          options: {
            filter: true,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value === "true") {
                return (
                  <div style={{ textAlign: "center", color: "#18CD70" }}>
                    <CheckCircleIcon />
                  </div>
                );
              } else {
                return (
                  <div style={{ textAlign: "center", color: "#FF4570" }}>
                    <CancelIcon />
                  </div>
                );
              }
            },
          },
        },
        {
          label: "We Deliver",
          name: "we_deliver",
          options: {
            filter: true,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value === "true") {
                return (
                  <div style={{ textAlign: "center", color: "#18CD70" }}>
                    <CheckCircleIcon />
                  </div>
                );
              } else {
                return (
                  <div style={{ textAlign: "center", color: "#FF4570" }}>
                    <CancelIcon />
                  </div>
                );
              }
            },
          },
        },
        {
          label: "Created By",
          name: "dispatched_by",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          label: "Status",
          name: "status",
          options: {
            filter: true,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value === "Booked") {
                return (
                  <Alert
                    icon={false}
                    severity="success"
                    className="bookedAlert"
                  >
                    Booked
                  </Alert>
                );
              } else if (value === "Complete_payment") {
                return (
                  <Alert icon={false} color="info" className="completePayAlert">
                    Complete Payment
                  </Alert>
                );
              } else if (value === "Initial_Payment") {
                return (
                  <Alert icon={false} color="info" className="intialAlert">
                    Initial Payment
                  </Alert>
                );
              } else if (value === "Confirmed") {
                return (
                  <Alert icon={false} color="info" className="confirmedAlert">
                    Confirmed
                  </Alert>
                );
              } else if (value === "Pre-check") {
                return (
                  <Alert icon={false} color="info" className="precheckAlert">
                    Pre-check
                  </Alert>
                );
              } else if (value === "Hired") {
                return (
                  <Alert icon={false} color="info" className="hiredAlert">
                    Hired
                  </Alert>
                );
              } else if (value === "Returned") {
                return (
                  <Alert icon={false} color="info" className="returnedAlert">
                    Returned
                  </Alert>
                );
              } else if (value === "Return_Precheck") {
                return (
                  <Alert icon={false} color="info" className="returnPreAlert">
                    Return Precheck
                  </Alert>
                );
              } else if (value === "Complete") {
                return (
                  <Alert icon={false} color="info" className="completeAlert">
                    Complete
                  </Alert>
                );
              }
            },
          },
        },

        {
          label: "Actions",
          name: "action",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <>
                  <ButtonGroup
                    color="primary"
                    aria-label="outlined primary button group"
                  >
                    <Tooltip placement="top" title="View Details">
                      <Button
                        disableElevation
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{ background: "#5BABE4" }}
                        onClick={() => {
                          this.onViewClick(tableMeta);
                        }}
                      >
                        <ViewIcon />
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </>
              );
            },
          },
        },
      ],
    };
  }

  handleClose = () => {
    this.setState({
      modelOpen: false,
    });
  };

  onViewClick = (rowData, rowMeta) => {
    rowData = rowData.rowData;
    this.state.bookingsList.filter((m) => {
      if (m.booking_id === rowData[0]) {
        this.props.isUniversal(m.id);
        this.setState({
          isDataLoaded: true,
          loadedData: m,
          rowData: m,
          modelOpen: true,
        });
      }
      return null;
    });
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };
  profileClose = () => {
    this.setState({ profileOpen: false });
  };
  onRowClick = (rowData, rowMeta) => {
    this.props.dataList.filter((m) => {
      if (m.tax.vehicle.vehicle_reg_no === rowData[0]) {
        this.props.isUniversal(m.tax.vehicle.id);
      }
      return null;
    });
    this.setState({ profileOpen: true });
  };

  componentDidMount = () => {
    this.setState({
      bookingsList: this.props.dataList,
    });
  };
  setmounted = (value) => {
    this.setState({ mounted: value });
  };
  updateDays = (e) => {
    if (e.target.value.length < 1) {
      this.setState({
        numberOfDays: e.target.value,
      });
    } else {
      this.setState({
        numberOfDays: e.target.value,
      });
      this.props
        .listData(
          "hiring/rental-due/" + e.target.value,
          this.props.id_token,
          false
        )
        .then((res) => {
          this.setState({
            mounted: false,
            dataLoaded: true,
            bookingsList: res.data,
          });
        });
    }
  };

  render() {
    if (
      this.props.id_token &&
      !this.state.mounted &&
      this.props.daysResReceived
    ) {
      var data = [];
      if (this.state.bookingsList && !this.state.mounted) {
        this.state.bookingsList.map((m) => {
          data = [
            ...data,
            {
              key: m.booking_id,
              reg_number: m.vehicle.vehicle_reg_no,
              start_date: m.start_date,
              end_date: m.end_date,
              customer_name: m.customer.name,
              we_collect: m.collection_at_depot.toString(),
              we_deliver: m.delivery.toString(),
              status: m.status,
              dispatched_by: m.dispatched_by.email,
            },
          ];
          return data;
        });

        this.setState({ data: data, mounted: true });
      } else {
        this.setState({ emptyList: true, data: [], mounted: true });
      }
    }
    var options = {
      filterType: "multiselect",
      filter: true,
      selectableRows: "none",
      selectableRowsOnClick: false,
      responsive: "stacked",
      textLabels: {
        body: {
          noMatch: !this.state.emptyList ? (
            <CircularProgress
              style={{ margin: "20px auto", textAlign: "center" }}
            />
          ) : (
            <NoRecord />
          ),
        },
      },
      onRowClick: (rowData, rowMeta) => {
        this.onRowClick(rowData, rowMeta);
      },
    };
    return (
      <div style={{ marginTop: "20px", padding: "10px 20px 20px 20px" }}>
        <Grid item xs={6} style={{ paddingRight: "10px", paddingLeft: "10px" }}>
          <TextField
            type="number"
            value={this.state.numberOfDays}
            label="No of days"
            id="outlined-start-adornment"
            onChange={this.updateDays}
            variant="outlined"
          />
        </Grid>
        <MUIDataTable
          columns={this.state.columns}
          options={options}
          data={this.state.data}
        />
        <Dialog
          open={this.state.profileOpen}
          onClose={this.profileClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Vehicle Profile</DialogTitle>
          <DialogContent>
            <ProfileCard history={this.props.history}></ProfileCard>
          </DialogContent>
        </Dialog>
        <Dialog
          onEnter={() => {
            this.setState({ profileOpen: false });
          }}
          open={this.state.modelOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Booking Details</DialogTitle>
          <DialogContent>
            <ViewBookingDetails
              setmounted={this.setmounted}
              handleClose={this.handleClose}
              dataToPass={this.state.loadedData}
              dataFromRow={this.state.rowData}
              history={this.props.history}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id_token: state.user.id_token,
    bookingsList: state.api["hiring/booking-list"],
    dataList: state.api["hiring/rental-due/7"],
  };
};

export default connect(mapStateToProps, { listData, isUniversal })(Tax);
