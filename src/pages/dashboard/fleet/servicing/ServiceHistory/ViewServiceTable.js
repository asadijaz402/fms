import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { CircularProgress } from "@mui/material";
import moment from "moment";
import ServiceDialog from "../Dialogs/ServiceDialog";

const columns = [
  {
    label: "Contact Date",
    name: "due_date",
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    label: "Status",
    name: "status",
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    label: "Mileage",
    name: "mileage",
    options: {
      filter: false,
      sort: false,
    },
  },

  {
    label: "Action",
    name: "id",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        return <ServiceDialog rowId={value} />;
      },
    },
  },
];

export default function ViewServiceTable({ data }) {
  const [tableData, setTableData] = useState([["Loading ..."]]);

  useEffect(() => {
    let temp_data = [];
    temp_data = data
      .slice(0)
      .reverse()
      .map((m) => {
        return {
          key: m.id,
          due_date: moment(m.due_date, "YYYY-MM-DDThh:mm").format(
            "DD MMM YYYY"
          ),
          status: m.status,
          mileage: m.current_mileage !== null ? m.current_mileage : 0,
          id: m.id,
        };
      });
    setTableData(temp_data);
  }, [data]);

  const options = {
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

  return <MUIDataTable columns={columns} options={options} data={tableData} />;
}
