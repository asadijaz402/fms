import React from 'react';
import moment from 'moment';
import DynamicDataTable from '../../../../../../Components/DynamicDataTable';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import FinanceDialog from '../Dialogs/FinanceDialog';
import DescriptionIcon from '@mui/icons-material/Description';

const DateFormat = ({ value }) => {
  return moment(value, 'YYYY-MM-DDThh:mm').format('ddd Do MMM YYYY');
};

const ActionButtons = ({ row }) => {
  return (
    <Box display="flex">
      <Box>
        <FinanceDialog rowId={row.id} data={row} />
      </Box>
      <Box>{/* <DeleteCustomer data={row} /> */}</Box>
      <Box>
        <Tooltip title="Invoice Detail">
          <IconButton
            size="small"
            href={'/finance/invoice/' + row.id + '/' + 'invoice_detail'}
          >
            <DescriptionIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

const Status = ({ value }) => {
  let color = 'primary';
  switch (value) {
    case 'paid':
      color = 'success';
      break;
    case 'Canceled':
      color = 'error';
      break;
    case 'unPaid':
      color = 'default';
      break;

    default:
      color = 'primary';
      break;
  }
  if (value === 'Pending Validation') {
    return <Chip size="small" label={value} color="secondary" />;
  } else {
    return <Chip size="small" label={value} color={color} />;
  }
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
    name: 'id',
    sort: true,
    filter: false,
    omit: true,
  },

  {
    name: 'booking',
    label: 'Booking',
    omit: true,
  },
  {
    name: 'date_paid',
    label: 'customer',
    omit: true,
  },
  {
    name: 'items_list',
    label: 'customer',
    omit: true,
  },
  {
    name: 'logs',
    label: 'logs',
    omit: true,
  },
  {
    name: 'customer',
    label: 'Customer',
    value: 'name',
  },
  {
    name: 'company',
    omit: true,
  },
  {
    name: 'created_by',
    omit: true,
  },
  {
    name: 'date_generated',
    comp: DateFormat,
    sort: true,
    filter: true,
    filterData: {
      query: 'date_added__range',
      type: 'date',
    },
  },
  {
    name: 'status',
    comp: Status,
    omit: false,
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

export default function Finance() {
  return (
    <DynamicDataTable
      title="Invoices"
      urlLink="finances/invoices/list/?de_fleeted=0&"
      columnsCustom={columnsCustom}
      addNew={[<FinanceDialog />]}
    />
  );
}
