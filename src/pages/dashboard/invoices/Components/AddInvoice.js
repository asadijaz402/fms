import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Box,
  IconButton,
  InputAdornment,
  Tooltip,
  TextField,
  FormLabel,
  Switch,
} from "@mui/material";
import "react-notifications-component/dist/theme.css";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Close as CloseIcon } from "@mui/icons-material";
import Autocomplete from "@mui/lab/Autocomplete";
import { Search as SearchIcon } from "@mui/icons-material";
import Alert from "@mui/lab/Alert";
import { connect } from "react-redux";
import {
  listData,
  createUpdateData,
  searchData,
} from "src/Redux/actions/apiActions";
import Progress from "src/Components/Progress";
import Check from "@mui/icons-material/CheckCircleOutlineOutlined";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
class AddInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      items_list: {},
      serviceBy: false,
      array: [
        {
          names: "",
          price: "",
        },
      ],
      customer: "",
      status: "Unpaid",
      booking: "",
      invoice_Id: "",
    };
    this.total_cash = 0;
  }

  onHandleChangePaid = () => {
    if (this.state.status === "Unpaid") {
      this.setState({ status: "Paid" });
    } else {
      this.setState({ status: "Unpaid" });
    }
  };

  onHandleChangeItem = (elemId, name) => (e) => {
    var arrayItem = [...this.state.array];
    //ask alternate method of it
    if (name === "names") {
      arrayItem[elemId].names = e.target.value;
    } else {
      arrayItem[elemId].price = e.target.value;
    }
    this.setState({
      array: arrayItem,
    });
  };

  onHandleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };
  onDropChangeNew = (event, values) => {
    let options = [];
    this.props
      .searchData(values, "hiring/customer/list/", this.props.id_token, false)
      .then((res) => {
        res.data.results.length !== 0 &&
          res.data.results.map((data) => {
            return (options = [...options, data.name]);
          });
        this.setState({ loading: false, options: options });
        res.data.results.filter((row) => {
          return row.name === values && this.setState({ customer: row.id });
        });
      });
  };

  onDropChange = (e) => {
    this.props.customer_data.filter((cust) => {
      return (
        cust.id === e.target.value &&
        this.setState({
          customer: cust.id,
        })
      );
    });
  };
  handleChangeCheck = (e) => {
    this.setState({ serviceBy: e.target.checked });
    this.setState({ customer: "", booking: "" });
  };
  pushComponents = () => {
    var array = [...this.state.array];
    var obj = { names: "", price: "" };
    array.push(obj);
    this.setState({
      array: array,
    });
  };
  removeRow = (itemIndex) => {
    var newArray = [...this.state.array];
    newArray.splice(itemIndex, 1);
    this.setState({ array: newArray });
  };
  createNewInvoice = () => {
    this.state.array.map((row, index) => {
      if (!row.names || !row.price) {
        this.setState({ error: true });
      } else {
        this.setState({
          loading: true,
          error: false,
        });

        this.total_cash = this.state.array
          .filter(({ price }) => price !== "")
          .reduce(function (sum, record) {
            return parseInt(sum) + parseInt(record.price);
          }, 0);
        var items_list = { ...this.state.items_list };
        this.state.array.map((row) => {
          return (items_list[row.names] = row.price);
        });
        this.setState({ items_list: items_list }, () => {
          this.props
            .createUpdateData(
              {
                total_cash: this.total_cash,
                items_list: this.state.items_list,
                status: this.state.status,
                customer: this.state.customer,
                booking: this.state.booking,
              },
              "invoice",
              this.props.id_token,
              false
            )
            .then((res) => {
              let status_response = res;
              this.props
                .listData("invoice", this.props.id_token, false)
                .then((res) => {
                  this.props.setmounted(false);
                  this.props.handleClose();
                  if (
                    status_response &&
                    (status_response.status === 201 ||
                      status_response.status === 200)
                  ) {
                    store.addNotification({
                      title: "Request for adding new transaction",
                      message: "New transaction added Successfully",
                      type: "success", // 'default', 'success', 'info', 'warning'
                      container: "bottom-left", // where to position the notifications
                      animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
                      animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
                      dismiss: {
                        duration: 5000,
                      },
                    });
                    this.setState({ invoice_Id: this.props.new_invoice });
                  } else {
                    store.addNotification({
                      title: "Request for adding new transaction",
                      message: "New transaction was Not added Successfully",
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
      }
      return null;
    });

    if (this.state.array.length === 0) {
      this.setState({ error: false, loading: true });
      this.props
        .createUpdateData(
          {
            items_list: this.state.items_list,
            total_cash: 0,
            status: this.state.status,
            customer: this.state.customer && this.state.customer,
            booking: this.state.booking && this.state.booking,
          },
          "invoice",
          this.props.id_token,
          false
        )
        .then((res) => {
          if (res && (res.status === 201 || res.status === 200)) {
            store.addNotification({
              title: "Request for adding new transaction",
              message: "New transaction added Successfully",
              type: "success", // 'default', 'success', 'info', 'warning'
              container: "bottom-left", // where to position the notifications
              animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
              dismiss: {
                duration: 5000,
              },
            });
            this.props.listData("invoice", this.props.id_token, false);
            this.setState({ invoice_Id: this.props.new_invoice });
          } else {
            store.addNotification({
              title: "Request for adding new transaction",
              message: "New transaction was Not added Successfully",
              type: "danger", // 'default', 'success', 'info', 'warning'
              container: "bottom-left", // where to position the notifications
              animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
              dismiss: {
                duration: 5000,
              },
            });
          }
          this.props.handleClose();
        });
    } else {
      return null;
    }
  };
  render() {
    if (this.state.loading) {
      return <Progress />;
    } else {
      return (
        <div>
          <form>
            {this.state.error && (
              <Alert
                style={{ marginBottom: "10px" }}
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      this.setState({ error: false });
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                One of the entries of Items Row is empty!
              </Alert>
            )}

            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Available Info</FormLabel>
                  <Grid
                    component="label"
                    container
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>Customer</Grid>
                    <Grid item>
                      <Switch
                        checked={this.state.serviceBy}
                        onChange={(e) => this.handleChangeCheck(e)}
                        name="checkedC"
                      />
                    </Grid>
                    <Grid item>Booking</Grid>
                  </Grid>
                </FormControl>
              </Grid>
              <Grid item xs={6}></Grid>
              {this.state.serviceBy ? (
                <Grid item xs={6}>
                  <TextField
                    name="booking"
                    label="Booking"
                    variant="outlined"
                    value={this.state.booking}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    SelectProps={{
                      native: true,
                    }}
                    onChange={this.onHandleChange("booking")}
                  />
                </Grid>
              ) : (
                <Grid item xs={6}>
                  <Autocomplete
                    freeSolo
                    id="free-solo-2-demo"
                    disableClearable
                    // value={value.customer && value.customer.toString()}
                    options={this.state.options ? this.state.options : [""]}
                    onInputChange={this.onDropChangeNew}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Customer"
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          ...params.InputProps,
                          type: "search",
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className="searchIcons"
                            >
                              <SearchIcon style={{ fill: "#545454" }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>
              )}
              <Grid
                item
                xs={6}
                style={{ marginTop: !this.state.serviceBy && "16px" }}
              >
                <FormControl style={{ width: "100%" }} variant="outlined">
                  <InputLabel htmlFor="component-simple">Status</InputLabel>
                  <OutlinedInput
                    labelWidth={50}
                    id="component-simple"
                    value={this.state.status}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={this.onHandleChangePaid}>
                          <Tooltip placement="top" title="Change Status">
                            <Check
                              style={{
                                color:
                                  this.state.status === "Paid"
                                    ? "green"
                                    : "red",
                              }}
                            ></Check>
                          </Tooltip>
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            {this.state.array &&
              this.state.array.map((data, index) => {
                return (
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        value={data.names}
                        style={{ width: "100%" }}
                        label="Item Name"
                        onChange={this.onHandleChangeItem(index, "names")}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        type="number"
                        value={data.price}
                        style={{ width: "100%" }}
                        label="Item Price"
                        onChange={this.onHandleChangeItem(index, "price")}
                        id="outlined-basic"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton
                        onClick={() => {
                          this.removeRow(index);
                        }}
                      >
                        <Tooltip placement="top" title="Delete Row">
                          <DeleteOutlineIcon
                            style={{
                              fontSize: "30px",
                              color: "blue",
                            }}
                          ></DeleteOutlineIcon>
                        </Tooltip>
                      </IconButton>
                    </Grid>
                  </Grid>
                );
              })}
            {this.state.array.length !== 0 && (
              <Grid container spacing={3}>
                <Grid xs={6}></Grid>
                <Grid item xs={5}>
                  <TextField
                    style={{ width: "100%" }}
                    value={this.state.array
                      .filter(({ price }) => price !== "")
                      .reduce(function (sum, record) {
                        return parseInt(sum) + parseInt(record.price);
                      }, 0)}
                    label="Total cash"
                    id="outlined-basic"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            )}

            <Grid container spacing={3}>
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
                    onClick={this.pushComponents}
                    style={{ marginTop: "25px", marginRight: "5px" }}
                  >
                    Add Item
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.createNewInvoice}
                    style={{ marginTop: "25px" }}
                    disabled={
                      this.props.user_data &&
                      (this.state.booking || this.state.customer)
                        ? false
                        : true
                    }
                  >
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
    customer_data: state.api.allcustomers,
    new_invoice: state.api.post_data,

    user_data: state.user.user_data,
  };
};

export default connect(mapStateToProps, {
  listData,
  createUpdateData,
  searchData,
})(AddInvoice);
