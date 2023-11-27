import React from "react";
import { Chip, Box } from "@mui/material";
import moment from "moment";
import ProfileCard from "../../../../../Components/Profilecard/Card";
import DynamicMUITable from "../../../../../Components/DynamicMUITable";
import BookMOTDialog from "./Dialogs/BookMOTDialog";
import UpdateStatusDialog from "./Dialogs/UpdateStatusDialog";

const VehicleProfileCard = (value, tableMeta, updateValue) => {
  return (
    <ProfileCard
      reg_number={value.vehicle_id.vehicle_reg_no}
      vehicle_id={value.vehicle_id.id}
    />
  );
};

const DateFormat = (value) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
};

const Status = (value) => {
  if (value === "Pending Validation") {
    return <Chip label={value} color="secondary" />;
  } else {
    return <Chip label={value} color="primary" />;
  }
};

export default function BookMOT() {
  const ActionButtons = (value, tableMeta, updateValue) => {
    console.log(tableMeta);
    if (tableMeta.rowData[3] === true) {
      return (
        <Box display="flex">
          <Box mr={1}>
            <BookMOTDialog tableMeta={tableMeta} rowId={value} />
          </Box>
          <Box>
            <UpdateStatusDialog tableMeta={tableMeta} rowId={value} />
          </Box>
        </Box>
      );
    } else {
      return <BookMOTDialog tableMeta={tableMeta} rowId={value} />;
    }
  };

  const columnsCustom = [
    { name: "id", sort: true, filter: false, display: false },

    {
      name: "mot",
      label: "Reg Number",
      vehicle: true,
      sort: true,
      comp: VehicleProfileCard,
    },

    {
      label: "MOT Expired",
      name: "due_date",
      comp: DateFormat,
      sort: true,
      // display: false,
    },
    {
      label: "Test date",
      name: "test_date",
      comp: DateFormat,
    },
    {
      label: "Employee name",
      name: "employee_name",
      display: false,
    },
    {
      label: "Booked by",
      name: "booked_by",
      display: false,
    },
    {
      label: "Customer",
      name: "customer",
      display: false,
    },
    {
      label: "Employee name",
      name: "employee_name",
      display: false,
    },
    {
      name: "garage",
      display: false,
    },
    {
      name: "status",
      comp: Status,
      filter: true,
      filterOptions: ["Pending Validation", "Booked", "Completed"],
      filterType: "dropdown",
    },

    {
      name: "newColumnArray",
      new: [
        {
          name: "id",
          label: "Action",
          comp: ActionButtons,
        },
      ],
    },
  ];

  return (
    <DynamicMUITable
      title="Upcoming Vehicle MOT"
      urlLink="vehicle_accessories/MOT/list/?"
      columnsCustom={columnsCustom}
      // addNew={[<MakeVehicleLiveDialog />, <ExportDialog />]}
    />
  );
}
