import React, { Component } from "react";

import MUIDataTable from "mui-datatables";
import {
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  IconButton,
  DialogActions,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import Alert from "@mui/lab/Alert";
import { connect } from "react-redux";
import { listData, deleteData } from "../../../../../Redux/actions/apiActions";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import ViewInvoice from "./ViewInvoice";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class SelectedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],

      columns: [
        {
          label: "Invoice Id",
          name: "invoice_id",
          options: {
            filter: false,
            sort: false,
          },
        },
        {
          label: "Date Issued",
          name: "date_issued",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          label: "Paid Amount",
          name: "total_paid_amount",
          options: {
            filter: false,
            sort: true,
          },
        },
        {
          label: "Gross Amount",
          name: "gross_amount",
          options: {
            filter: false,
            sort: true,
          },
        },
      ],
    };
  }
  componentDidMount = () => {
    if (this.props.paid) {
      this.props
        .listData(
          "dvla/kashflow_invoices_paid/" + this.props.Id,
          this.props.id_token,
          false
        )
        .then((res) => {
          this.setState({ List: res.data });
        });
    } else if (this.props.unpaid) {
      this.props
        .listData(
          "dvla/kashflow_invoices/" + this.props.Id,
          this.props.id_token,
          false
        )
        .then((res) => {
          this.setState({ List: res.data });
        });
    }
  };

  render() {
    var data = [];

    if (this.state.List.length !== 0) {
      this.state.List.slice(0)
        .reverse()
        .map((m) => {
          data = [
            ...data,
            {
              key: m.id,

              invoice_id: m.invoice_id ? m.invoice_id : "-",

              date_issued: m.date_issued
                ? moment(m.date_issued, "YYYY-MM-DDThh:mm").format(
                    "DD MMM YYYY"
                  )
                : "-",

              total_paid_amount: m.total_paid_amount
                ? m.total_paid_amount
                : "-",
              gross_amount: m.gross_amount ? m.gross_amount : "-",
              actions: { id: m.id },
            },
          ];
          return data;
        });
    }

    var options = {
      filterType: "multiselect",
      filter: true,
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
        <MUIDataTable
          columns={this.state.columns}
          options={options}
          data={data}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id_token: state.user.id_token,
  };
};

export default connect(mapStateToProps, { listData, deleteData })(SelectedList);
