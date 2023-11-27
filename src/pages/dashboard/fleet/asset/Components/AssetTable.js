import React from 'react';
import DynamicDataTable from '../../../../../Components/DynamicDataTable';
import AssetDialog from './Dialogs/AssetDialog';
import moment from 'moment';
import { VehicleList } from './Dialogs/VehicleList';
import RowMore from './RowMore';

const DateFormat = ({ value }) => {
  return moment(value, 'YYYY-MM-DDThh:mm').format('ddd Do MMM YYYY');
};

const vehicleList = ({ row }) => {
  return <VehicleList row={row} />;
};

const Actions = ({ row }) => {
  return <RowMore row={row} />;
};

const columnsCustom = [
  { name: 'id', sort: true, filter: false, omit: true },
  {
    name: 'name',
    label: 'Name',
    sort: true,
  },
  {
    name: 'assigned',
    label: 'Assigned',
    sort: true,
    comp: vehicleList,
  },
  {
    name: 'image_vault',
    omit: true,
  },
  {
    name: 'file_vault',
    omit: true,
  },
  {
    name: 'company',
    omit: true,
  },
  {
    name: 'created_at',
    label: 'Created at',
    display: true,
    sort: true,
    omit: true,
    comp: DateFormat,
    filter: true,
    filterData: {
      query: 'updated_at__range',
      type: 'date',
    },
  },
  {
    name: 'updated_at',
    label: 'Updated at',
    display: true,
    sort: true,
    comp: DateFormat,
    filter: true,
    filterData: {
      query: 'updated_at__range',
      type: 'date',
    },
  },
  {
    name: 'newColumnArray',
    new: [{ name: 'id', label: 'Action', comp: Actions }],
  },
  {
    name: 'customFields',
  },
];

export default function AssetTable({ content }) {
  return (
    <DynamicDataTable
      title="Assets"
      urlLink={'assets/list/?' + content + '&'}
      columnsCustom={columnsCustom}
      model_table="assets_asset"
      addNew={[<AssetDialog />]}
    />
  );
}
