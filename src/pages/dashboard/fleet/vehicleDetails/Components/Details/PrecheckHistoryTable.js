import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";
import PrecheckDialog from "../../../precheck/Components/Dialogs/PrecheckDialog";
export const PrecheckHistoryTable = ({ data, details }) => {
  const [tableData, setTableData] = useState([["Loading ..."]]);
  useEffect(() => {
    setTableData(data);
  }, [data]);
  const column = [
    {
      label: "Id",
      name: "id",
      options: {
        filter: false,
        sort: false,
        display: true,
      },
    },
    {
      label: "Date Added",
      name: "date_added",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
        },
      },
    },
    {
      label: "Expiry Date",
      name: "due_date",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
        },
      },
    },
    {
      label: "Action",
      name: "id",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <PrecheckDialog
              rowId={value}
              vehicleId={details.id}
              tableMeta={details}
            />
          );
        },
      },
    },
  ];

  var options = {
    responsive: "stacked",
    filter: false,
    selectableRows: "none",
    selectableRowsOnClick: false,
    download: false,
    print: false,
    // customToolbar: () => {
    //   if (addNew) {
    //     return addNew;
    //   } else {
    //     return true;
    //   }
    // },
  };

  return <MUIDataTable options={options} columns={column} data={tableData} />;
};
