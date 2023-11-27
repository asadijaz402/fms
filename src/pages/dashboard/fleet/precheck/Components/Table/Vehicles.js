import React from "react";
import moment from "moment";
import DynamicDataTable from "../../../../../../Components/DynamicDataTable";
import ProfileCard from "../../../../../../Components/Profilecard/Card";
import { Box, Chip } from "@mui/material";
import PrecheckDialog from "../Dialogs/PrecheckDialog";
import ViewHistoryDialog from "../Dialogs/ViewHistoryDialog";

const DateFormat = ({ value }) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
};

const VehicleProfileCard = ({ row }) => {
  return <ProfileCard reg_number={row.vehicle_reg_no} vehicle_id={row.id} />;
};

const ActionButtons = ({ row }) => {
  return (
    <Box display="flex">
      <Box mr={1}>
        <PrecheckDialog vehicleId={row.id} tableMeta={row} />
      </Box>
      <Box>
        <ViewHistoryDialog vehicleId={row.id} tableMeta={row} />
      </Box>
    </Box>
  );
};

const Group = ({ value, row }) => {
  return (
    <Box display="flex">
      {value.map((row) => {
        return (
          <Box mr={1}>
            <Chip label={row.code} size="small" />
          </Box>
        );
      })}
    </Box>
  );
};

const columnsCustom = [
  {
    name: "id",
    sort: true,
    filter: false,
    omit: true,
  },

  {
    name: "vehicle_reg_no",
    label: "Reg Number",
    vehicle: true,
    sort: true,
    comp: VehicleProfileCard,
    props: {
      button: true,
      width: "200px",
    },
  },
  {
    name: "manufacturer_id",
    label: "Manufacturer",
    value: "name",
    filter: true,
    filterData: {
      url: "vehicle/manufacturer",
      query: "manufacturer_id__name__in",
      target: "name",
      type: "multiple",
    },
  },
  {
    name: "employee_id",
    label: "Owned",
    value: "first_name",
    props: {
      wrap: false,
    },
    filter: true,
    filterData: {
      url: "account/staff/all",
      query: "employee_id__first_name__in",
      target: "first_name",
      type: "multiple",
    },
  },
  {
    label: "Type",
    name: "vehicle_type_id",
    value: "name",
    filter: true,
    filterData: {
      url: "vehicle/vehicle-types",
      query: "vehicle_type_id__name__in",
      target: "name",
      type: "multiple",
    },
  },
  {
    name: "supplier_id",
    value: "first_name",
    label: "Supplier",
    filter: true,
    filterData: {
      url: "vehicle/supplier",
      query: "supplier_id__first_name__in",
      target: "first_name",
      type: "multiple",
    },
  },
  {
    name: "depot_id",
    label: "Depot",
    omit: true,
    value: "details",
  },
  {
    name: "date_added",
    comp: DateFormat,
    sort: true,
    filter: true,
    filterData: {
      query: "date_added__range",
      type: "date",
    },
  },
  {
    name: "image",
    omit: true,
  },
  {
    name: "group_id",
    label: "Group",
    comp: Group,
    value: "Code",
    filter: true,
    filterData: {
      url: "vehicle/group",
      query: "group_id__code",
      target: "code",
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

export default function Vehicles() {
  return (
    <DynamicDataTable
      title="Vehicles"
      urlLink="vehicle/list/?de_fleeted=0&"
      columnsCustom={columnsCustom}
    />
  );
}
