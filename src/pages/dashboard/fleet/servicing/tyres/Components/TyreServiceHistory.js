import React from "react";
import moment from "moment";
import DynamicMUITable from "../../../../../../Components/DynamicMUITable";
import ProfileCard from "../../../../../../Components/Profilecard/Card";
import PreviousFormsDialog from "./Dialogs/PreviousFormsDialog";
import TyresBookingDialog from "./Dialogs/TyresBookingDialog";
import { green } from "@mui/material/colors";
import {
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";
import { Box } from "@mui/material";

const DateFormat = (value) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY (h:mm)");
};

const VehicleProfileCard = (value, tableMeta, updateValue) => {
  return <ProfileCard reg_number={value} vehicle_id={tableMeta.rowData[0]} />;
};

const ActionButtons = (value, tableMeta, updateValue) => {
  return (
    <Box display="flex">
      <Box mr={1}>
        <TyresBookingDialog vehicleId={value} />
      </Box>
      <Box>
        <PreviousFormsDialog row_id={value} reg_number={tableMeta.rowData[1]} />
      </Box>
    </Box>
  );
};

const HireStatus = (value) => {
  if (value) {
    return <CheckIcon style={{ color: green[500] }} />;
  } else {
    return <CancelIcon color="secondary" />;
  }
};

const columnsCustom = [
  { name: "id", sort: true, filter: false, display: false },
  {
    name: "vehicle_reg_no",
    label: "Reg Number",
    vehicle: true,
    sort: true,
    comp: VehicleProfileCard,
  },
  {
    name: "hire_status",
    comp: HireStatus,
    filter: true,
    filterOptions: ["True", "False"],
    filterType: "dropdown",
  },
  {
    name: "manufacturer_id",
    label: "Model",
    value: "company",
  },
  {
    name: "ownership",
    label: "Owned By",
    value: "owner",
  },
  {
    name: "vehicle_type_id",
    label: "Type",
    value: "name",
  },
  {
    name: "supplier_id",
    label: "Supplier",
    value: "first_name",
  },
  {
    name: "depot_id",
    label: "Depot",
    value: "details",
  },
  {
    name: "date_added",
    comp: DateFormat,
    sort: true,
  },
  {
    name: "image",
    display: false,
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

export default function TyreServiceHistory() {
  return (
    <DynamicMUITable
      title="Vehicles Tyre Service History"
      urlLink="vehicle/list/?"
      columnsCustom={columnsCustom}
    />
  );
}
