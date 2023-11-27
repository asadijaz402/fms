import React from 'react';
import DynamicMUITable from '../../../../../Components/DynamicMUITable';
import ProfileCard from '../../../../../Components/Profilecard/Card';
// import BookingDialog from "../Dialogs/BookingDialog";
import { green } from '@mui/material/colors';
import {
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import { Chip, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddingBooking from '../AddingBooking/AddingBooking';

const DateFormat = (value) => {
  return moment(value, 'YYYY-MM-DDThh:mm').format('ddd Do MMM YYYY');
};

const VehicleProfileCard = (value, tableMeta, updateValue) => {
  return (
    <ProfileCard reg_number={value.vehicle_reg_no} vehicle_id={value.id} />
  );
};

const ActionButtons = (value, tableMeta, updateValue) => {
  // return <BookingDialog rowId={value} />;
  return (
    <Button component={Link} to={'/bookings/details/overview/' + value}>
      Details
    </Button>
  );
};

const TrueFalse = (value) => {
  if (value) {
    return <CheckIcon style={{ color: green[500] }} />;
  } else {
    return <CancelIcon color='error' />;
  }
};

const Status = (value) => {
  if (value === 'Pending Validation') {
    return <Chip label={value} color='secondary' />;
  } else {
    return <Chip label={value} color='primary' />;
  }
};

const Group = (value, tableMeta) => {
  return (
    <Box display='flex'>
      {value.map((row) => {
        const { vehicle_reg_no, id } = row.vehicle;
        return (
          <Box mr={1}>
            <ProfileCard reg_number={vehicle_reg_no} vehicle_id={id} />
          </Box>
        );
      })}
    </Box>
  );
};

export default function BookingsTable({ context }) {
  const columnsCustom = [
    { name: 'id', sort: true, filter: false, display: false },
    {
      name: 'booking_id',
      label: 'Booking Id',
      sort: true,
      display: false,
    },
    {
      name: 'vehicle',
      label: 'Vehicle',
      vehicle: true,
      sort: true,
      comp: VehicleProfileCard,
    },
    {
      label: 'Start Date',
      name: 'start_date',
      comp: DateFormat,
      sort: true,
    },
    {
      label: 'End Date',
      name: 'end_date',
      comp: DateFormat,
      sort: true,
    },
    {
      label: 'Date Created',
      name: 'date_created',
      comp: DateFormat,
      sort: true,
    },
    {
      name: 'vehicle_list',
      label: 'Group',
      comp: Group,
    },
    {
      name: 'delivery_details',
      label: 'Delivery Details',
      display: false,
    },
    {
      name: 'collection_details',
      label: 'Collection Details',
      display: false,
    },
    {
      name: 'deliver',
      label: 'We Deliver',
      comp: TrueFalse,
      filter: true,
      filterOptions: [1, 0],
    },
    {
      name: 'collection_at_depot',
      label: 'We Collect',
      comp: TrueFalse,
      filter: true,
      filterOptions: [1, 0],
    },
    {
      label: 'Customer',
      name: 'customer',
      value: 'name',
    },
    {
      label: 'Kashflow Code',
      name: 'customer',
      value: 'kashflow_code',
    },
    {
      label: 'Dispatched By',
      name: 'dispatched_by',
      value: 'email',
      display: false,
    },
    {
      name: 'status',
      comp: Status,
      filter: true,
      filterOptions: [
        'Booked',
        'Initial_Payment',
        'Confirmed',
        'Pre-check',
        'Hired',
        'Returned',
        'Return Precheck',
        'Complete Payment',
        'Complete',
        'Cancel',
      ],
      filterType: 'dropdown',
    },
    {
      name: 'collection_depo',
      label: 'Collection Depo',
      display: false,
    },
    {
      name: 'finances',
      label: 'Finance',
      display: false,
    },
    {
      name: 'notes',
      label: 'Notes',
      display: false,
    },
    {
      name: 'bookingGroup',
      label: 'Booking Group',
    },
    {
      name: 'newColumnArray',
      new: [
        {
          name: 'bookingGroup',
          label: 'Action',
          comp: ActionButtons,
        },
      ],
    },
  ];

  return (
    <DynamicMUITable
      title='Bookings'
      urlLink={
        context.split('=')[0] === 'driver'
          ? 'driver/assigned/' + context.split('=')[1] + '/?'
          : 'hiring/bookings/list/?' + context + '&'
      }
      columnsCustom={columnsCustom}
      addNew={<AddingBooking />}
    />
  );
}
