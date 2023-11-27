import React from "react";
import { Box, Button, Tooltip } from "@mui/material";
import AsyncSeacrchInput from "./AsyncSearchInput";
import { useSelector } from "react-redux";
import MUIDataTable from "mui-datatables";
import { Delete as DeleteIcon } from "@mui/icons-material";
import toast from "react-hot-toast";

export default function VehicleSearch({
  value,
  handleNext,
  handleBack,
  handleChange,
}) {
  const columns = [
    {
      label: "Id",
      name: "id",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      label: "Reg Number",
      name: "vehicle_reg_no",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      label: "Action",
      name: "action",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Tooltip placement="top" title="Remove from list">
              <Button
                variant="contained"
                disableElevation
                size="small"
                style={{ background: "#FF4570" }}
                color="secondary"
                onClick={() => {
                  RemoveVehicle(tableMeta.rowData[0]);
                }}
                startIcon={<DeleteIcon />}
              >
                Remove
              </Button>
            </Tooltip>
          );
        },
      },
    },
  ];

  const RemoveVehicle = (id) => {
    handleChange({
      target: {
        name: "vehicles",
        value: value.vehicles.filter((veh) => veh.id !== id),
      },
    });
  };

  var options = {
    responsive: "stacked",
    filter: false,
    selectableRows: "none",
    selectableRowsOnClick: false,
    download: false,
    print: false,
  };

  let search_data = useSelector(
    (state) => state.api["vehicle/list/?hire_status=false"]
  );

  const AddVehicle = (val) => {
    if (
      value?.vehicles?.filter((veh) => veh?.vehicle_reg_no === val?.vehicle_reg_no)
        .length === 0
    ) {
      toast.success("Vehicle Added Successfully!");
      handleChange({
        target: {
          name: "vehicles",
          value: [
            ...value?.vehicles,
            { id: val.id, vehicle_reg_no: val.vehicle_reg_no },
          ],
        },
      });
    }
  };

  const onChange = (value) => {
    search_data.results.map((val) => {
      if (val.vehicle_reg_no === value) {
        return AddVehicle(val);
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Box>
        <Box mb={2} fullWidth>
          <AsyncSeacrchInput
            url="vehicle/list/?hire_status=false"
            handleChange={onChange}
          />
        </Box>

        <Box fullWidth>
          <MUIDataTable
            options={options}
            columns={columns}
            data={value.vehicles}
          />
        </Box>

        <Box
          fullWidth
          style={{
            float: "right",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          <Button onClick={handleBack}>Back</Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            Finish
          </Button>
        </Box>
      </Box>
    </>
  );
}
