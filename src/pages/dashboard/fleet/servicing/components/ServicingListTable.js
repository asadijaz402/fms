import React from "react";
import DynamicDataTable from "../../../../../Components/DynamicDataTable";
import { Box, Chip } from "@mui/material";
import moment from "moment";
import ProfileCard from "../../../../../Components/Profilecard/Card";
import ServiceDialog from "../Dialogs/ServiceDialog";
import DeleteServiceDialog from "../Dialogs/DeleteServiceDialog";
import {
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
} from "@mui/icons-material";

const DateFormat = ({ value }) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
};

const VehicleProfileCard = ({ value }) => {
  return (
    <ProfileCard reg_number={value.vehicle_reg_no} vehicle_id={value.id} />
  );
};

const ActionButtons = ({ row }) => {
  return (
    <Box display="flex">
      <Box>
        <ServiceDialog rowId={row.id} status={row.status} />
      </Box>
      {row.status !== "Completed" && (
        <Box ml={1}>
          <DeleteServiceDialog rowId={row.id} />
        </Box>
      )}
    </Box>
  );
};

const Status = ({ value }) => {
  if (value === "Pending Validation") {
    return <Chip label={value} color="warning" />;
  } else if (value === "Completed") {
    return <Chip label={value} color="success" />;
  } else {
    return <Chip label={value} />;
  }
};

const Booking = ({ row }) => {
  if (row.service_booked) {
    return <CheckIcon fontSize="small" color="success" />;
  } else {
    return <CancelIcon color="error" fontSize="small" />;
  }
};

const columnsCustom = [
  { name: "id", sort: true, omit: true },
  {
    name: "vehicle",
    label: "Reg Number",
    vehicle: true,
    sort: true,
    comp: VehicleProfileCard,
    props: {
      width: "200px",
    },
  },
  {
    name: "cost",
    sort: true,
  },
  {
    label: "Contact Date",
    name: "due_date",
    comp: DateFormat,
    sort: true,
    filter: true,
    filterData: {
      type: "date",
      query: "due_date__range",
    },
  },
  {
    label: "Agreed Date",
    name: "service_date",
    comp: DateFormat,
    sort: true,
    filter: true,
    filterData: {
      type: "date",
      query: "service_date__range",
    },
  },
  {
    name: "booking_time",
    label: "Created at",
    comp: DateFormat,
    sort: true,
    filter: true,
    filterData: {
      type: "date",
      query: "booking_time__range",
    },
  },
  {
    name: "fuel_filter",
    omit: true,
  },
  {
    name: "air_filter",
    omit: true,
  },
  {
    name: "oil_filter",
    omit: true,
  },
  {
    name: "pollen_filter",
    omit: true,
  },
  {
    name: "mileage",
    omit: true,
  },
  {
    name: "manufacturers_servicing",
    omit: true,
  },
  {
    name: "oil_change",
    omit: true,
  },
  {
    name: "additions_service",
    label: "Additional Service",
    omit: true,
  },
  {
    name: "status",
    comp: Status,
    filter: true,
    filterData: {
      list: ["Pending Validation", "Booked", "Completed"],
      query: "status__in",
      type: "multiple",
    },
  },
  {
    name: "service_booked",
    label: "Booking",
    comp: Booking,
    omit: true,
  },
  {
    name: "garage",
    omit: true,
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

export default function ServicingListTable() {
  return (
    <DynamicDataTable
      title="Vehicles booked for Servicing"
      urlLink="vehicle_accessories/service/list/?"
      columnsCustom={columnsCustom}
      addNew={[<ServiceDialog />]}
    />
  );
}
