import React from "react";
import DynamicMUITable from "../../../../Components/DynamicMUITable";
import { Box, Button } from "@mui/material";
import GenericDialog from "../dialogs/GenericDialog";

const ActionButtons = (value, tableMeta) => {
  return (
    <Box display="flex">
      <Box mr={1}>
        <GenericDialog form="Suppliers" id={value} data={tableMeta.rowData} />
      </Box>
      <Box>
        <Button
          href={
            "/suppliers/vehicles/" +
            tableMeta.rowData[1] +
            " " +
            tableMeta.rowData[2] +
            "/" +
            value +
            "/all"
          }
          color="primary"
          variant="outlined"
          size="small"
        >
          Vehicles
        </Button>
      </Box>
    </Box>
  );
};

const columnsCustom = [
  { name: "id", sort: true, filter: false, display: false },

  {
    name: "first_name",
    label: "First Name",
    sort: true,
  },
  {
    name: "last_name",
    label: "Last Name",
    sort: true,
  },
  {
    name: "email",
    label: "Email",
    sort: true,
  },
  {
    name: "contact",
    label: "Contact",
    sort: true,
  },
  {
    name: "details",
    label: "Details",
    display: false,
  },
  {
    name: "company",
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

export default function VehicleTable({ content }) {
  return (
    <DynamicMUITable
      title="Vehicle Suppliers"
      urlLink={"vehicle/supplier/list/?" + content + "&"}
      columnsCustom={columnsCustom}
      addNew={[<GenericDialog form="Suppliers" />]}
      description="External users, whose vehicle/s are managed by you. Will be asked to select this while adding a vehicle."
    />
  );
}
