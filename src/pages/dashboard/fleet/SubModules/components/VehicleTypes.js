import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import DynamicDataTable from '../../../../../Components/DynamicDataTable';
import GenericDialog from '../dialogs/GenericDialog';

const ActionButtons = ({ row }) => {
  return <GenericDialog form="VehicleType" id={row.id} data={row} />;
};

const columnsCustom = [
  { name: 'id', sort: true, filter: false },

  {
    name: 'name',
    label: 'Name',
    sort: true,
  },
  {
    name: 'company',
    omit: true,
  },
  {
    name: 'details',
    label: 'Details',
    omit: true,
  },
  {
    name: 'newColumnArray',
    new: [
      {
        name: 'id',
        label: 'Action',
        comp: ActionButtons,
      },
    ],
  },
];

export default function VehicleTable({ content }) {
  return (
    <>
      <DynamicDataTable
        title="Vehicle Types"
        urlLink={'vehicle/vehicle-types/list/?' + content + '&'}
        columnsCustom={columnsCustom}
        addNew={[<GenericDialog form="VehicleType" />]}
        description="Types of vehicle, for e.g. Car, Van, SUV ... "
      />
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
        }}
      >
        <Button
          variant="outlined"
          component="a"
          sx={{ ml: 1 }}
          href="https://wiki-fleetvantage.bondwest.co.uk/en/guide/list_of_global_types"
          target="_blank"
        >
          View Global Types
        </Button>

        <Typography variant="body1" color="GrayText">
          global types list is provided here →
        </Typography>
      </Box>
    </>
  );
}
