import React from "react";
import DynamicDataTable from "../../../../../../Components/DynamicDataTable";
import EditVORDialog from "./Dialog/EditVORDialog";
import { Box } from "@mui/material";

export default function VORList() {
  const ActionButtons = ({ row }) => {
    return (
      <Box display="flex">
        <Box mr={1}>
          <EditVORDialog rowId={row.id} />
        </Box>
        <Box>
          <EditVORDialog rowId={row.id} viewVehicles />
        </Box>
      </Box>
    );
  };

  const columnsCustom = [
    { name: "id", sort: true, filter: false, omit: true },
    {
      name: "name",
      label: "Name",
      display: true,
    },
    {
      name: "vehicles",
      omit: true,
      value: "vehicle_reg_no",
    },
    {
      name: "address",
      label: "Address",
      display: true,
    },
    {
      name: "city",
      label: "City",
      display: true,
    },
    {
      name: "country",
      label: "Country",
      display: true,
    },
    {
      name: "company",
      omit: true,
    },
    {
      name: "other_details",
      label: "Other Details",
      display: false,
    },
    {
      name: "newColumnArray",
      new: [
        {
          name: "id",
          label: "Action",
          comp: ActionButtons,
          props: {
            allowOverflow: true,
          },
        },
      ],
    },
  ];

  return (
    <DynamicDataTable
      title="Vehicle Off Road (VOR) Locations"
      urlLink="vehicle/vortype/list/?"
      columnsCustom={columnsCustom}
      addNew={[<EditVORDialog />]}
    />
  );
}
