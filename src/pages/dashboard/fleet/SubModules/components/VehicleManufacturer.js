import React from 'react';
import DynamicDataTable from '../../../../../Components/DynamicDataTable';
import GenericDialog from '../dialogs/GenericDialog';

const ActionButtons = ({ row }) => {
  return <GenericDialog form="VehicleManufacturer" id={row.id} data={row} />;
};

const columnsCustom = [
  { name: 'id', sort: true, filter: false },

  {
    name: 'name',
    label: 'Company Name',
    sort: true,
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

export default function VehicleManufacturer({ content }) {
  return (
    <DynamicDataTable
      title="Vehicle Manufacturer"
      urlLink={'vehicle/manufacturer/list/?' + content + '&'}
      columnsCustom={columnsCustom}
      addNew={[<GenericDialog form="VehicleManufacturer" />]}
      description="Vehicle manufactured by for e.g. BMW, Toyota ..."
    />
  );
}
