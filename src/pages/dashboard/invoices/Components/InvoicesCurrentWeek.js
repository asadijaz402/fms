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
  Card,
  List,
  ListItem,
  InputBase,
  Grid,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import Alert from "@mui/lab/Alert";
import "react-notifications-component/dist/theme.css";
import { connect } from "react-redux";
import { listData } from "src/Redux/actions/apiActions";
import { CircularProgress } from "@mui/material";
import SelectedList from "./SelectedList";

class InvoicesCurrentWeek extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer_name: "",
      emptyList: false,
      mounted: false,
      tableMeta: null,
      infoId: "",
      Id: 0,
      paid: false,
      unpaid: false,
      avoidRender: false,
      modelListOpen: false,
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
      Paidcount: 0,
      Unpaidcount: 0,
      Paidamountcount: 0,
      Unpaidamountcount: 0,
      Paidgrosscount: 0,
      Unpaidgrosscount: 0,
      getCustomerLoaded: false,
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
          label: "Paid Invoices",
          name: "paidCount",
          options: {
            filter: false,
            sort: true,
          },
        },

        {
          label: "Unpaid Invoices",
          name: "unpaidCount",
          options: {
            filter: false,
            sort: true,
          },
        },

        {
          label: "Paid Amount",
          name: "paidCash",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          label: "Unpaid Amount",
          name: "unpaidCash",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          label: "Paid Gross",
          name: "paidGross",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          label: "Unpaid Gross",
          name: "unpaidGross",
          options: {
            filter: false,
            sort: true,
          },
        },

        {
          label: "View Invoices",
          name: "actions",
          options: {
            filter: false,
            sort: false,
            customBodyRender: (value, tableMeta, updateValue) => {
              return (
                <ButtonGroup
                  color="primary"
                  aria-label="outlined primary button group"
                >
                  <Tooltip placement="top" title="View Unpaid Invoices">
                    <Button
                      variant="contained"
                      size="small"
                      disableElevation
                      color="primary"
                      style={{ background: "#5BABE4" }}
                      onClick={() => this.onUnpaidClick(tableMeta)}
                    >
                      <AssignmentIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip placement="top" title="View Paid Invoices">
                    <Button
                      variant="contained"
                      disableElevation
                      size="small"
                      color="primary"
                      style={{ background: "#018786" }}
                      onClick={() => this.onPaidClick(tableMeta)}
                    >
                      <AssignmentTurnedInIcon />
                    </Button>
                  </Tooltip>
                </ButtonGroup>
              );
            },
          },
        },
      ],
    };
  }
  onUnpaidClick = (tableMeta) => {
    this.setState({
      customer_name: tableMeta.rowData[0],
      infoId: tableMeta.rowData[tableMeta.rowData.length - 1].id,
      paid: false,
      unpaid: true,
      modelListOpen: true,
      error: tableMeta.rowData[3] === 0 ? true : false,
    });
  };

  onPaidClick = (tableMeta) => {
    this.setState({
      infoId: tableMeta.rowData[tableMeta.rowData.length - 1].id,
      paid: true,
      unpaid: false,
      modelListOpen: true,
      error: tableMeta.rowData[2] === 0 ? true : false,
    });
  };
  saveMeta = (tableMeta) => {
    this.setState({ tableMeta: tableMeta }, () => {
      this.setState({ modelDeleteOpen: true });
    });
  };

  componentDidMount = () => {};
  handleClose = () => {
    this.setState(
      {
        modelOpen: false,
        modelOpen2: false,
        modelOpenAdd: false,
        modelDeleteOpen: false,
        getCustomerLoaded: false,
        modelChangeOpen: false,
        modelOpenView: false,
      },
      () => {}
    );
  };

  render() {
    if (
      this.props.id_token &&
      !this.state.mounted &&
      this.props.curentWeekResponse
    ) {
      var data = [];
      if (
        this.props.invoiceList &&
        this.props.invoiceList.length !== 0 &&
        !this.state.mounted
      ) {
        this.setState({ mounted: true });
        this.props.invoiceList.map((m) => {
          data = [
            ...data,
            {
              key: m.customer_info.id ? m.customer_info.id : "0",
              paidCount: m.total_paid_invoices
                ? parseInt(m.total_paid_invoices)
                : 0,
              unpaidCount: m.total_unpaid_invoices
                ? parseInt(m.total_unpaid_invoices)
                : 0,
              paidCash: m.total_amount_paid
                ? parseFloat(m.total_amount_paid)
                : 0,
              unpaidCash: m.total_amount_unpaid
                ? parseFloat(m.total_amount_unpaid)
                : 0,
              paidGross: m.gross_total_paid
                ? parseFloat(m.gross_total_paid)
                : 0,
              unpaidGross: m.gross_total_unpaid
                ? parseFloat(m.gross_total_unpaid)
                : 0,
              customer: m.customer_info.name ? m.customer_info.name : "N/A",
              kashflow_code: m.customer_info.code
                ? m.customer_info.code
                : "N/A",
              actions: { id: m.customer_info.id },
            },
          ];
          return data;
        });
        this.setState({ data: data, mounted: true });
        const Paidcount =
          this.props.invoiceList.length !== 0 &&
          this.props.invoiceList.reduce(
            (sum, object) => sum + (object.total_paid_invoices || 0),
            0
          );
        const Unpaidcount =
          this.props.invoiceList.length !== 0 &&
          this.props.invoiceList.reduce(
            (sum, object) => sum + (object.total_unpaid_invoices || 0),
            0
          );
        const Paidamountcount =
          this.props.invoiceList.length !== 0 &&
          this.props.invoiceList.reduce(
            (sum, object) => sum + (object.total_amount_paid || 0),
            0
          );
        const Unpaidamountcount =
          this.props.invoiceList.length !== 0 &&
          this.props.invoiceList.reduce(
            (sum, object) => sum + (object.total_amount_unpaid || 0),
            0
          );
        const Paidgrosscount =
          this.props.invoiceList.length !== 0 &&
          this.props.invoiceList.reduce(
            (sum, object) => sum + (object.gross_total_paid || 0),
            0
          );
        const Unpaidgrosscount =
          this.props.invoiceList.length !== 0 &&
          this.props.invoiceList.reduce(
            (sum, object) => sum + (object.gross_total_unpaid || 0),
            0
          );
        this.setState({
          Paidcount: Paidcount,
          Unpaidcount: Unpaidcount,
          Paidamountcount: Paidamountcount,
          Unpaidamountcount: Unpaidamountcount,
          Paidgrosscount: Paidgrosscount,
          Unpaidgrosscount: Unpaidgrosscount,
        });
      } else {
        this.setState({ emptyList: true, data: [], mounted: true });
      }
    }
    var options = {
      filterType: "multiselect",
      filter: true,
      download: this.props.user_data.groups.includes(6),
      print: this.props.user_data.groups.includes(6),
      selectableRows: "none",
      selectableRowsOnClick: false,
      responsive: "stacked",

      textLabels: {
        body: {
          noMatch: (
            <CircularProgress
              style={{ margin: "20px auto", textAlign: "center" }}
            />
          ),
        },
      },
    };
    return (
      <div style={{ marginTop: "20px", padding: "10px 20px 20px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Card style={{ flex: 1 }}>
              <List>
                <ListItem divider>
                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%" }}
                      value="Total Paid Invoices"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "left", fontWeight: "bold" },
                      }}
                    ></InputBase>
                  </Grid>

                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%", color: "rgb(89, 98, 117)" }}
                      value={this.state.Paidcount && this.state.Paidcount}
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                    ></InputBase>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%" }}
                      value="Total Unpaid Invoices"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "left", fontWeight: "bold" },
                      }}
                    ></InputBase>
                  </Grid>

                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%", color: "rgb(89, 98, 117)" }}
                      value={this.state.Unpaidcount && this.state.Unpaidcount}
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                    ></InputBase>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card style={{ flex: 1 }}>
              <List>
                <ListItem divider>
                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%" }}
                      value="Total Paid Amount"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "left", fontWeight: "bold" },
                      }}
                    ></InputBase>
                  </Grid>

                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%", color: "rgb(89, 98, 117)" }}
                      value={
                        this.state.Paidamountcount &&
                        this.state.Paidamountcount.toFixed(2)
                      }
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                    ></InputBase>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%" }}
                      value="Total Unpaid Amount"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "left", fontWeight: "bold" },
                      }}
                    ></InputBase>
                  </Grid>

                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%", color: "rgb(89, 98, 117)" }}
                      value={
                        this.state.Unpaidamountcount &&
                        this.state.Unpaidamountcount.toFixed(2)
                      }
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                    ></InputBase>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item xs={4}>
            {" "}
            <Card style={{ flex: 1 }}>
              <List>
                <ListItem divider>
                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%" }}
                      value="Total Paid Gross"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "left", fontWeight: "bold" },
                      }}
                    ></InputBase>
                  </Grid>

                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%", color: "rgb(89, 98, 117)" }}
                      value={
                        this.state.Paidgrosscount &&
                        this.state.Paidgrosscount.toFixed(2)
                      }
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                    ></InputBase>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%" }}
                      value="Total Unpaid Gross"
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "left", fontWeight: "bold" },
                      }}
                    ></InputBase>
                  </Grid>

                  <Grid item xs={6}>
                    <InputBase
                      style={{ width: "100%", color: "rgb(89, 98, 117)" }}
                      value={
                        this.state.Unpaidgrosscount &&
                        this.state.Unpaidgrosscount.toFixed(2)
                      }
                      inputProps={{
                        readOnly: true,
                        style: { textAlign: "right" },
                      }}
                    ></InputBase>
                  </Grid>
                </ListItem>
              </List>
            </Card>
          </Grid>
        </Grid>

        <Divider />

        <MUIDataTable
          columns={this.state.columns}
          options={options}
          data={this.state.data}
        />

        <Dialog
          open={this.state.modelListOpen}
          onClose={() => this.setState({ modelListOpen: false })}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.state.paid
              ? "Last 7 days Paid invoices for"
              : "Last 7 days Unpaid invoices for"}
            {" " + this.state.customer_name}
          </DialogTitle>
          <DialogContent>
            {!this.state.error ? (
              <SelectedList
                Id={this.state.infoId}
                paid={this.state.paid}
                unpaid={this.state.unpaid}
              />
            ) : (
              <Alert severity="error">
                No {this.state.paid ? "Paid" : "Unpaid"} Invoice found!
              </Alert>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id_token: state.user.id_token,
    invoiceList: state.api["dvla/kashflow_invoices_comparison"],
    user_data: state.user.user_data,
  };
};

export default connect(mapStateToProps, {
  listData,
})(InvoicesCurrentWeek);
