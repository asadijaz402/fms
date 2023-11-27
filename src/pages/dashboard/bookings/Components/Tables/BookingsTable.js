import React from 'react';
import DynamicDataTable from '../../../../../Components/DynamicDataTable';
import ProfileCard from '../../../../../Components/Profilecard/Card';
import {
  Cancel as CancelIcon,
  CheckCircle as CheckIcon,
  Details as DetailsIcon,
} from '@mui/icons-material';
import { Chip, IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AddingBooking from '../AddingBooking/AddingBooking';

const DateFormat = ({ value }) => {
  return moment(value, 'YYYY-MM-DDThh:mm').format('ddd Do MMM YYYY');
};

const VehicleProfileCard = ({ row }) => {
  return (
    <ProfileCard
      reg_number={row.vehicle.vehicle_reg_no}
      vehicle_id={row.vehicle.id}
    />
  );
};

const ActionButtons = ({ row }) => {
  // return <BookingDialog rowId={value} />;
  return (
    <Tooltip title="Booking details">
      <IconButton
        component={Link}
        size="small"
        color="info"
        to={'/bookings/details/overview/' + row.bookingGroup}
      >
        <DetailsIcon color="info" fontSiz="small" />
      </IconButton>
    </Tooltip>
  );
};

const TrueFalseDeliver = ({ row }) => {
  if (row.deliver) {
    return <CheckIcon fontSize="small" color="success" />;
  } else {
    return <CancelIcon color="error" fontSize="small" />;
  }
};

const TrueFalseCollect = ({ row }) => {
  if (row.collection_at_depot) {
    return <CheckIcon fontSize="small" color="success" />;
  } else {
    return <CancelIcon color="error" fontSize="small" />;
  }
};

const Status = ({ value }) => {
  let color = 'primary';
  switch (value) {
    case 'Complete':
      color = 'success';
      break;
    case 'Cancel':
      color = 'error';
      break;
    case 'Booked':
      color = 'default';
      break;
    case 'Confirmed':
      color = 'primary';
      break;

    default:
      color = 'primary';
      break;
  }
  if (value === 'Pending Validation') {
    return <Chip label={value} color="secondary" />;
  } else {
    return <Chip label={value} color={color} />;
  }
};

export default function BookingsTable({ context }) {
  const columnsCustom = [
    { name: 'id', sort: true, filter: false, omit: true },
    {
      name: 'booking_id',
      label: 'Booking Id',
      sort: true,
      omit: true,
    },
    {
      name: 'vehicle',
      label: 'Vehicle',
      vehicle: true,
      sort: true,
      comp: VehicleProfileCard,
      props: {
        button: true,
        width: '200px',
      },
    },
    {
      label: 'Start Date',
      name: 'start_date',
      comp: DateFormat,
      sort: true,
      filter: true,
      filterData: {
        query: 'start_date__range',
        type: 'date',
      },
    },
    {
      label: 'End Date',
      name: 'end_date',
      comp: DateFormat,
      sort: true,
      filter: true,
      filterData: {
        query: 'end_date__range',
        type: 'date',
      },
    },
    {
      label: 'Date Created',
      name: 'date_created',
      comp: DateFormat,
      sort: true,
      filter: true,
      filterData: {
        query: 'date_created__range',
        type: 'date',
      },
    },
    {
      name: 'delivery_details',
      label: 'Delivery Details',
      omit: true,
    },
    {
      name: 'collection_details',
      label: 'Collection Details',
      omit: true,
    },
    {
      name: 'image_vault',
      label: 'Image Vault',
      omit: true,
    },
    {
      name: 'deliver',
      label: 'We Deliver',
      comp: TrueFalseDeliver,
      // filter: true,
      // filterData: {
      //   list: ["True", "False"],
      //   query: "deliver",
      //   type: "multiple",
      // },
    },
    {
      name: 'collection_at_depot',
      label: 'We Collect',
      comp: TrueFalseCollect,
      // filter: true,
      // filterData: {
      //   list: ["True", "False"],
      //   query: "collection_at_depot",
      //   type: "multiple",
      // },
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
      omit: true,
    },
    {
      name: 'status',
      comp: Status,
      filter: true,
      // style: (row) => ({ backgroundColor: row.complete ? "pink" : "green" }),
      filterData: {
        list: [
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
        query: 'status__in',
        type: 'multiple',
      },
    },
    {
      name: 'collection_depo',
      label: 'Collection Depo',
      omit: true,
    },
    {
      name: 'finances',
      label: 'Finance',
      omit: true,
    },
    {
      name: 'notes',
      label: 'Notes',
      omit: true,
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
    <DynamicDataTable
      title="Bookings"
      urlLink={
        context.split('=')[0] === 'driver'
          ? 'driver/assigned/' + context.split('=')[1] + '/?'
          : 'hiring/bookings/list/?' + context + '&'
      }
      columnsCustom={columnsCustom}
      addNew={[<AddingBooking />]}
    />
  );
}
