import React, { Component } from "react";

import MUIDataTable from "mui-datatables";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  Tooltip,
  ButtonGroup,
  Divider,
  DialogActions,
} from "@mui/material";
import {
  AddCircle as AddCircleIcon,
  ListAlt as ViewIcon,
} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import CachedIcon from "@mui/icons-material/Cached";
import Alert from "@mui/lab/Alert";
import moment from "moment";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Progress from "src/Components/Progress";
import { connect } from "react-redux";
import {
  listData,
  getData,
  editUpdateData,
} from "src/Redux/actions/apiActions";
import { CircularProgress } from "@mui/material";
import AddInvoice from "./AddInvoice";
import ViewInvoice from "./ViewInvoice";
import { NoRecord } from "src/Components/NoRecord";
class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyList: false,
      mounted: false,
      data: [],
      tableMeta: null,
      infoId: "",
      Id: 0,
      avoidRender: false,
      modelOpenAdd: false,
      modelOpen: false,
      modelDeleteOpen: false,
      modelOpenView: false,
      modalOpen2: false,
      selectedDate: new Date(),
      error: false,
      loadedData: "",
      isDataLoaded: false,
      rowData: {},
      columns: [
        {
          label: "Customer",
          name: "customer",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          label: "Customer Code",
          name: "kashflow_code",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          label: "Cash",
          name: "total_cash",
          options: {
            filter: false,
            sort: true,
          },
        },

        {
          label: "Booking",
          name: "booking",
          options: {
            filter: false,
            sort: false,
          },
        },

        {
          label: "Date",
          name: "date",
          options: {
            filter: false,
            sort: true,
            customBodyRender: (value, tableMeta, updateValue) => {
              return moment(value).format("YYYY-MM-DD");
            },
          },
        },
        {
          label: "Status",
          name: "status",
          options: {
            filter: true,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              if (value === "Paid") {
                return (
                  <Alert
                    icon={false}
                    severity="success"
                    className="bookedAlert"
                  >
                    Paid
                  </Alert>
                );
              } else if (value === "Unpaid") {
                return (
                  <Alert
                    icon={false}
                    severity="error"
                    className="returnPreAlert"
                  >
                    Unpaid
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
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  <Tooltip placement="top" title="View Transaction Info">
                    <Button
                      variant="contained"
                      size="small"
                      disableElevation
                      color="primary"
                      style={{ background: "#5BABE4" }}
                      onClick={() => this.onViewClick(tableMeta)}
                    >
                      <ViewIcon />
                    </Button>
                  </Tooltip>
                  {tableMeta.rowData[5] === "Unpaid" && (
                    <Tooltip placement="top" title="Change Status">
                      <Button
                        disableElevation
                        variant="contained"
                        size="small"
                        color="primary"
                        style={{ background: "#018786" }}
                        onClick={() => {
                          this.saveMeta(tableMeta);
                        }}
                      >
                        <CachedIcon />
                      </Button>
                    </Tooltip>
                  )}
                </ButtonGroup>
              );
            },
          },
        },
      ],
    };
  }
  saveMeta = (tableMeta) => {
    this.setState({ tableMeta: tableMeta, isloading: false }, () => {
      this.setState({ modelDeleteOpen: true });
    });
  };

  handleClose = () => {
    this.setState(
      {
        modelDeleteOpen: false,
        modelOpenAdd: false,
        modelOpenView: false,
      },
      () => {}
    );
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  onConfirmClick = (tableMeta) => {
    this.setState({ isloading: true });
    this.props
      .getData(
        tableMeta.rowData[tableMeta.rowData.length - 1].id,
        "invoice",
        this.props.id_token,
        false
      )
      .then((res) => {
        this.props
          .editUpdateData(
            {
              status: "Paid",
            },
            "invoice",
            res.data.id,
            this.props.id_token,
            false
          )
          .then((res) => {
            let status_response = res;
            this.props
              .listData("invoice", this.props.id_token, false)
              .then((res) => {
                this.setState({ mounted: false });
                this.handleClose();
                if (
                  status_response &&
                  (status_response.status === 201 ||
                    status_response.status === 200)
                ) {
                  store.addNotification({
                    title: "Request for Status Change",
                    message: "Status changed to Paid successfully",
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
                    title: "Request for Status Change",
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
      });
  };

  onAddButtonClick = (tableMeta) => {
    this.setState({
      modelOpenAdd: true,
    });
  };
  setmounted = (value) => {
    this.setState({ mounted: value });
  };
  onViewClick = (data) => {
    this.setState({
      infoId: data.rowData[data.rowData.length - 1].id,
      modelOpenView: true,
    });
  };
  componentDidMount = () => {};
  render() {
    if (this.props.id_token && !this.state.mounted && this.props.resReceived) {
      var data = [];
      if (
        this.props.invoiceList &&
        this.props.invoiceList.length !== 0 &&
        !this.state.mounted
      ) {
        this.props.invoiceList.map((m) => {
          data = [
            ...data,
            {
              key: m.id,
              booking: m.booking == null ? "-" : m.booking.booking_id,
              status: m.status,
              customer: m.customer.name,
              kashflow_code: m.customer.kashflow_code
                ? m.customer.kashflow_code
                : "N/A",
              total_cash: m.total_cash ? parseFloat(m.total_cash) : 0,
              date: m.date_generated,
              action: { id: m.id },
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
      download: this.props.user_data.groups.includes(6),
      print: this.props.user_data.groups.includes(6),
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
    };
    return (
      <div style={{ marginTop: "20px", padding: "10px 20px 20px 20px" }}>
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={() => {
              this.setState({
                modelOpenAdd: true,
              });
            }}
            variant="contained"
            disableElevation
            style={{
              background: "#5BABE4",
              marginBottom: "16px",
              color: "#fff",
              marginRight: "38px",
            }}
          >
            <AddCircleIcon style={{ marginRight: "8px" }} /> Add Transaction
          </Button>
        </div>
        <Divider />

        <MUIDataTable
          columns={this.state.columns}
          options={options}
          data={this.state.data}
        />

        <Dialog
          open={this.state.modelOpenView}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">View Transaction</DialogTitle>
          <DialogContent>
            <ViewInvoice
              Id={this.state.infoId}
              handleClose={this.handleClose}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.modelOpenAdd}
          maxWidth="md"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Add New Transaction</DialogTitle>
          <IconButton
            aria-label="close"
            style={{ position: "absolute", right: "8px", top: "8px" }}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <AddInvoice
              setmounted={this.setmounted}
              handleClose={this.handleClose}
            />
          </DialogContent>
        </Dialog>

        <Dialog
          open={this.state.modelDeleteOpen}
          onClose={() => {
            this.setState({
              modelDeleteOpen: false,
            });
          }}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle id="draggable-dialog-title">
            {this.state.isloading ? (
              <div style={{ width: "100%" }}>
                <p>Changing Status</p>
                <Progress />
              </div>
            ) : (
              "Are you sure that you want to change status to Paid?"
            )}
          </DialogTitle>
          {!this.state.isloading && (
            <DialogActions>
              <Button
                onClick={() => {
                  this.onConfirmClick(this.state.tableMeta);
                }}
                color="primary"
              >
                Yes
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    modelDeleteOpen: false,
                  });
                }}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          )}
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id_token: state.user.id_token,
    user_data: state.user.user_data,
    invoiceList: state.api["invoice"],
  };
};

export default connect(mapStateToProps, {
  listData,
  getData,
  editUpdateData,
})(Table);
