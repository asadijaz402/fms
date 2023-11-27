import React from 'react';
import DynamicDataTable from '../../../../../Components/DynamicDataTable';
import moment from 'moment';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ProfileCard from '../../../../../Components/Profilecard/Card';
import { AssetList } from './Dialogs/AssetList';
import AssignAsset from './Dialogs/AssignAsset';
import { useState } from 'react';
import { AddVehicleAsset } from './Dialogs/AddVehicleAsset';

const VehicleProfileCard = ({ row }) => {
  return (
    <Box display="flex" alignItems="center">
      <Box>
        <ProfileCard
          reg_number={row?.vehicle?.vehicle_reg_no}
          vehicle_id={row?.vehicle?.id}
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
      color={value === 'Assigned' ? 'info' : 'error'}
    />
  );
};

const DateFormat = ({ value }) => {
  return moment(value, 'YYYY-MM-DDThh:mm').format('ddd Do MMM YYYY');
};

const UnAssigned = ({ value, row }) => {
  if (row.status === 'Assigned') {
    return '-';
  } else {
    return DateFormat({ value });
  }
};

const Actions = ({ row }) => {
  const [open, setOpen] = useState(false);
  return (
    <Box display="flex">
      {/* <Box>
        <DeleteAsset data={row} />
      </Box> */}
      <Box mr={1}>
        <AssetList data={row} type="vehicle" />
      </Box>
      <Box>
        <Button variant="outlined" size="small" onClick={() => setOpen(true)}>
          Assign Asset
        </Button>
        <Dialog
          onClose={() => setOpen(false)}
          fullWidth={true}
          maxWidth={'xs'}
          open={open}
        >
          <DialogTitle>Assigned Asset</DialogTitle>
          <DialogContent dividers>
            <AssignAsset data={row} />
          </DialogContent>
        </Dialog>{' '}
      </Box>
    </Box>
  );
};

const vehicleList = ({ row }) => {
  return (
    <Box display="flex">
      {row?.asset?.map((data) => (
        <Box mr={1}>
          <Chip label={data?.name} size="small" />
        </Box>
      ))}
    </Box>
  );
};

const columnsCustom = [
  { name: 'id', sort: true, filter: false, omit: true },
  {
    name: 'vehicle',
    label: 'Vehicle',
    vehicle: true,
    sort: true,
    comp: VehicleProfileCard,
    props: {
      width: '200px',
    },
  },
  {
    name: 'asset',
    label: 'Asset',
    sort: true,
    comp: vehicleList,
  },
  {
    name: 'logs',
    label: 'Logs',
    value: 'name',
    omit: true,
  },
  {
    name: 'date_added',
    label: 'Assigned On',
    comp: DateFormat,
    sort: true,
  },
  {
    name: 'last_updated',
    label: 'Un Assigned On',
    comp: UnAssigned,
    sort: true,
  },
  {
    name: 'status',
    label: 'Status',
    comp: Status,
    filter: true,
    filterData: {
      list: ['Assigned', 'Not Assigned'],
      query: 'status__in',
      type: 'multiple',
    },
  },
  {
    name: 'notes',
    omit: true,
    label: 'Notes',
  },
  {
    name: 'newColumnArray',
    new: [{ name: 'id', label: 'Action', comp: Actions }],
  },
];

export default function VehicleTable({ content }) {
  return (
    <DynamicDataTable
      title="Vehicles Assigned History"
      urlLink={'assets/assigned/list/?' + content + '&'}
      columnsCustom={columnsCustom}
      addNew={[<AddVehicleAsset />]}
    />
  );
}
