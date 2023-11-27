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
  return (
    <GenericDialog form="VehicleManufacturerGarage" id={row.id} data={row} />
  );
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

  {
    name: 'manufacturer_name',
    label: 'Garage Name',
    sort: true,
  },
  {
    name: 'manufacturer_address',
    label: 'Garage Address',
    sort: true,
    omit: true,
  },
  {
    name: 'manufacturer_person_name',
    label: 'Contact Person',
    sort: true,
  },
  {
    name: 'manufacturer_person_number',
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
    name: 'is_global',
    omit: true,
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

export default function VehicleManufacturerGarage({ content }) {
  return (
    <DynamicDataTable
      title="Manufacturer Garages"
      urlLink={'manufacturers/garages/list/?' + content + '&'}
      columnsCustom={columnsCustom}
      addNew={[<GenericDialog form="VehicleManufacturerGarage" />]}
      description="List of manufacturer garages where you can get your vehicle repaired. Manufacturer can be BMW and hence you can name garage as BMW - garage Name."
    />
  );
}
