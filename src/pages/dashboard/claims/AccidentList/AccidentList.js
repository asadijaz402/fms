import React from "react";
import DynamicMUITable from "../../../../Components/DynamicMUITable";
import { Chip, Box } from "@mui/material";
import moment from "moment";
import ProfileCard from "../../../../Components/Profilecard/Card";
// import { green } from "@mui/material/colors";
// import {
//   Cancel as CancelIcon,
//   CheckCircle as CheckIcon,
// } from "@mui/icons-material";
import AddCard from "./AddCard/AddCard";
import CardEditModal from "./CardEditModal";

const DateFormat = (value) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
};

const VehicleProfileCard = (value, tableMeta, updateValue) => {
  return (
    <ProfileCard reg_number={value.vehicle_reg_no} vehicle_id={value.id} />
  );
};

const ActionButtons = (value, tableMeta, updateValue) => {
  return (
    <Box display="flex">
      <Box>
        <CardEditModal rowId={value} />
      </Box>
    </Box>
  );
};

const Status = (value) => {
  if (value === "Pending Validation") {
    return <Chip label={value} color="secondary" />;
  } else {
    return <Chip label={value} color="primary" />;
  }
};

// const Booking = (value) => {
//   if (value) {
//     return <CheckIcon style={{ color: green[500] }} />;
//   } else {
//     return <CancelIcon color="secondary" />;
//   }
// };

const columnsCustom = [
  { name: "id", sort: true, filter: false, display: false },

  {
    name: "vehicle",
    label: "Reg Number",
    vehicle: true,
    sort: true,
    comp: VehicleProfileCard,
  },
  {
    name: "notes",
    display: false,
  },
  {
    name: "amount_owned_by_customer",
    label: "Customer Owe",
  },
  {
    name: "amount_owned_by_company",
    label: "Company Owe",
  },
  {
    name: "driver_name",
    label: "Driver",
  },
  {
    name: "date",
    label: "Date",
    comp: DateFormat,
    display: false,
  },
  {
    name: "customer_opinion",
    display: false,
  },
  {
    name: "location",
    display: false,
  },
  {
    name: "damages",
    display: false,
  },
  {
    name: "user_details",
    display: false,
  },
  {
    name: "attachments",
    display: false,
  },
  {
    name: "created_at",
    label: "Created At",
    comp: DateFormat,
  },
  {
    name: "updated_at",
    label: "Updated At",
    comp: DateFormat,
  },
  {
    name: "history",
    display: false,
  },
  {
    name: "status",
    comp: Status,
    filter: true,
    filterOptions: [
      "Open for Action",
      "Vehicle Recovered from the scene",
      "Request Report",
      "Report Received",
      "Report Approved",
      "Parking",
      "Garage",
      "Pre-Check",
      "Ready for Hire",
      "Removed from Fleet",
    ],
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

export default function AccidentListTable() {
  return (
    <DynamicMUITable
      title="Vehicle Accident Record"
      urlLink="claims/list/?"
      columnsCustom={columnsCustom}
      addNew={<AddCard />}
    />
  );
}
