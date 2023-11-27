import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import moment from "moment";

export default function VORHistoryTable({ data }) {
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
      label: "VOR Name",
      name: "name",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Created At",
      name: "created_at",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
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
}
