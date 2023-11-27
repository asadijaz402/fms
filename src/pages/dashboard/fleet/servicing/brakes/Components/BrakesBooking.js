import React from "react";
import moment from "moment";
import DynamicDataTable from "../../../../../../Components/DynamicDataTable";
import { Chip, Box } from "@mui/material";
import ProfileCard from "../../../../../../Components/Profilecard/Card";
import DeleteBrakesBookingDialog from "./Dialogs/DeleteBrakesBookingDialog";
import BrakesBookingDialog from "./Dialogs/BrakesBookingDialog";

const VehicleProfileCard = ({ value }) => {
  return (
    <ProfileCard reg_number={value.vehicle_reg_no} vehicle_id={value.id} />
  );
};

const DateFormat = ({ value }) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
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

export default function BrakesBooking() {
  const ActionButtons = ({ row }) => {
    return (
      <Box display="flex">
        <Box>
          <BrakesBookingDialog rowId={row.id} status={row.status} />
        </Box>
        <Box ml={1}>
          <DeleteBrakesBookingDialog rowId={row.id} />
        </Box>
      </Box>
    );
  };

  const columns = [
    { name: "id", sort: true, filter: false, omit: true },
    {
      name: "customer",
      omit: true,
    },
    {
      name: "cost",
      omit: true,
    },
    {
      name: "number_of_Brakes",
      omit: true,
    },
    {
      name: "employee_name",
      omit: true,
    },
    {
      name: "current_mileage",
      omit: true,
    },
    {
      name: "garage",
      omit: true,
    },
    {
      name: "manufacturers_servicing",
      omit: true,
    },
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
      name: "date_time_completed",
      comp: DateFormat,
      sort: true,
      filter: true,
      filterData: {
        type: "date",
        query: "date_time_completed__range",
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
      name: "status",
      comp: Status,
      filter: true,
      filterData: {
        list: ["Pending Validation", "Booked", "Completed", "Not Booked"],
        query: "status__in",
        type: "multiple",
      },
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
    <DynamicDataTable
      title="Vehicles booked for Brakes service (Live vehicles only)"
      urlLink="vehicle_accessories/brakes/list/?"
      columnsCustom={columns}
      addNew={[<BrakesBookingDialog />]}
    />
  );
}
