import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Box, CircularProgress, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../../../../slices/CustomSlices/actions/apiActions";
import PrecheckDialog from "./Dialogs/PrecheckDialog";
import moment from "moment";

const DateFormat = ({ value }) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY (h:mm)");
};

export default function ViewPrecheckHistory({ tableMeta, vehicleId }) {
  let parent_tableMeta = tableMeta;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  let id_token = useSelector((state) => state.user.id_token);

  useEffect(() => {
    if (vehicleId) {
      setLoading(true);
      dispatch(
        getData(vehicleId, "vehicle_accessories/precheck", id_token, false)
      ).then((res) => {
        setData(res.data);
        setLoading(false);
      });
    }
    // eslint-disable-next-line
  }, [vehicleId]);

  const columns = [
    {
      label: "Date Added",
      name: "date_added",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <DateFormat value={value} />;
        },
      },
    },
    {
      label: "Expiry Date",
      name: "due_date",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return <DateFormat value={value} />;
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
              vehicleId={vehicleId}
              tableMeta={parent_tableMeta}
            />
          );
        },
      },
    },
  ];

  var options = {
    filterType: "multiselect",
    filter: true,
    selectableRows: "none",
    selectableRowsOnClick: false,
    responsive: "stacked",
    textLabels: {
      body: {
        noMatch: <CircularProgress />,
      },
    },
  };

  if (loading) {
    return (
      <Box width={"100%"} style={{ textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  } else if (data.length === 0) {
    return <Alert severity="error">No history found!</Alert>;
  } else {
    return <MUIDataTable columns={columns} options={options} data={data} />;
  }
}
