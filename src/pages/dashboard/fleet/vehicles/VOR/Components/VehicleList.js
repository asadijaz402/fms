import React from "react";
import { Box, Chip } from "@mui/material";
import DynamicDataTable from "../../../../../../Components/DynamicDataTable";
import ViewVORDialog from "./Dialog/ViewVORDialog";
import VORSearch from "./Forms/VORSearch";
import ProfileCard from "../../../../../../Components/Profilecard/Card";
import moment from "moment";

export default function VehicleList() {
  const ActionButtons = ({ row }) => {
    return (
      <Box display="flex">
        <Box mr={1}>
          <ViewVORDialog vehicleData={row} />
        </Box>
        <Box>
          <VORSearch vehicleData={row} />
        </Box>
      </Box>
    );
  };

  const VehicleProfileCard = ({ row }) => {
    return <ProfileCard reg_number={row.vehicle_reg_no} vehicle_id={row.id} />;
  };

  const DateFormat = ({ row }) => {
    return moment(row.date_added, "YYYY-MM-DDThh:mm").format(
      "ddd Do MMM YYYY (h:mm)"
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
    { name: "id", sort: true, omit: true },

    {
      name: "vehicle_reg_no",
      label: "Reg Number",
      vehicle: true,
      sort: true,
      sortName: "vehicle__vehicle_reg_no",
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
      name: "ownership",
      label: "Owned",
      value: "owner",
    },
    {
      label: "Type",
      name: "vehicle_type_id",
      value: "name",
    },
    {
      name: "supplier_id",
      value: "first_name",
      label: "Supplier",
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
      name: "depot_id",
      omit: true,
      value: "details",
    },
    {
      name: "hire_status",
      omit: true,
    },
    {
      name: "date_added",
      comp: DateFormat,
      sort: true,
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
      title="Vehicle"
      urlLink="vehicle/list/?hire_status=false&"
      columnsCustom={columnsCustom}
      //   addNew={[<AddVorDialog />]}
    />
  );
}
