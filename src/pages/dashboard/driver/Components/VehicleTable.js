import React from "react";
import DynamicDataTable from "../../../../Components/DynamicDataTable";
import moment from "moment";
import { Box, Chip } from "@mui/material";
import DeleteDriver from "./Dialogs/DeleteDriver";
import ProfileCard from "../../../../Components/Profilecard/Card";

const VehicleProfileCard = ({ row }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <ProfileCard
          reg_number={row.vehicle.vehicle_reg_no}
          vehicle_id={row.vehicle.id}
        />
      </Box>
    </Box>
  );
};

const Status = ({ value }) => {
  return (
    <Chip
      label={value}
      size="small"
      color={value === "Assigned" ? "info" : "error"}
    />
  );
};

const DateFormat = ({ value }) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
};

const UnAssigned = ({ value, row }) => {
  if (row.status === "Assigned") {
    return "-";
  } else {
    return DateFormat({ value });
  }
};

const Actions = ({ row }) => {
  return (
    <Box display="flex">
      <Box>
        <DeleteDriver data={row} />
      </Box>
    </Box>
  );
};

const columnsCustom = [
  { name: "id", sort: true, filter: false, omit: true },
  {
    name: "vehicle",
    label: "Vehicle",
    vehicle: true,
    sort: true,
    comp: VehicleProfileCard,
    props: {
      width: "200px",
    },
  },
  {
    name: "driver",
    label: "Driver",
    value: "name",
    sort: true,
  },
  {
    name: "date_added",
    label: "Assigned On",
    comp: DateFormat,
    sort: true,
  },
  {
    name: "last_updated",
    label: "Un Assigned On",
    comp: UnAssigned,
    sort: true,
  },
  {
    name: "status",
    label: "Status",
    comp: Status,
    filter: true,
    filterData: {
      list: ["Assigned", "Not Assigned"],
      query: "status__in",
      type: "multiple",
    },
  },
  {
    name: "notes",
    omit: true,
    label: "Notes",
  },
  {
    name: "newColumnArray",
    new: [{ name: "id", label: "Action", comp: Actions }],
  },
];

export default function VehicleTable({ content }) {
  return (
    <DynamicDataTable
      title="Vehicles Assigned History"
      urlLink={"driver/assigned/list/?" + content + "&"}
      columnsCustom={columnsCustom}
      //   addNew={[<DriverDialog />]}
    />
  );
}
