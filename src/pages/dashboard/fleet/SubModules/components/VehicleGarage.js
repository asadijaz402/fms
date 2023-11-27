import React from 'react';
import DynamicDataTable from '../../../../../Components/DynamicDataTable';
import GenericDialog from '../dialogs/GenericDialog';
import moment from 'moment';
import { IconButton, Box, Tooltip } from '@mui/material';
import {
  WhatsApp as WhatsAppIcon,
  LocalPhone as PhoneIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';
import { numberFormat, copyToClipboard } from '../../../../../utils';

const ActionButtons = ({ row }) => {
  return <GenericDialog form="VehicleGarage" id={row.id} data={row} />;
};

const DateFormat = ({ value }) => {
  return moment(value, 'YYYY-MM-DDThh:mm').format('ddd Do MMM YYYY');
};

const Contact = ({ value }) => {
  return (
    <Box display="flex">
      <Box>
        <Tooltip title="Call on WhatsApp">
          <IconButton
            href={'https://wa.me/' + numberFormat(value)}
            target="_blank"
          >
            <WhatsAppIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="Call on Phone">
          <IconButton href={'tel:' + numberFormat(value)}>
            <PhoneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Tooltip title="Copy Number">
          <IconButton
            onClick={() => {
              copyToClipboard(value);
            }}
          >
            <CopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

const columnsCustom = [
  { name: 'id', sort: true, filter: false },
  { name: 'is_global', omit: true },
  {
    name: 'garage_name',
    label: 'Garage Name',
    sort: true,
  },
  {
    name: 'garage_address',
    label: 'Garage Address',
    sort: true,
    omit: true,
  },
  {
    name: 'contact_person_name',
    label: 'Contact Person',
    sort: true,
  },
  {
    name: 'contact_person_number',
    label: 'Contact Number',
    sort: true,
    comp: Contact,
  },
  {
    name: 'date_created',
    label: 'Date Created',
    sort: true,
    omit: true,
    comp: DateFormat,
  },
  {
    name: 'company',
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

export default function VehicleGarage({ content }) {
  return (
    <DynamicDataTable
      title="Vehicle Garages"
      urlLink={'garages/list/?' + content + '&'}
      columnsCustom={columnsCustom}
      addNew={[<GenericDialog form="VehicleGarage" />]}
      description="List of garages where you can get your vehicle repaired."
    />
  );
}
