import React from 'react';
import moment from 'moment';
import DynamicDataTable from '../../../../../../Components/DynamicDataTable';
import ProfileCard from '../../../../../../Components/Profilecard/Card';
import { Box } from '@mui/material';

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

const DateFormat = ({ value }) => {
  return moment(value, 'YYYY-MM-DDThh:mm').format('ddd Do MMM YYYY');
};

const columnsCustom = [
  {
    name: 'id',
    sort: true,
    filter: false,
    omit: true,
  },
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
    name: 'created_at',
    comp: DateFormat,
    sort: true,
    filter: true,
    filterData: {
      query: 'date_added__range',
      type: 'date',
    },
  },
  // {
  //   name: "newColumnArray",
  //   new: [
  //     {
  //       name: "id",
  //       label: "Action",
  //       comp: ActionButtons,
  //     },
  //   ],
  // },
];

export default function Vehicles({ data = '' }) {
  return (
    <DynamicDataTable
      title="Vehicles"
      urlLink={`tracker/odometer/list/?vehicle__id=${data}&`}
      columnsCustom={columnsCustom}
    />
  );
}
