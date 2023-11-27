import React from 'react';
import DynamicDataTable from '../../../../../Components/DynamicDataTable';
import GenericDialog from '../dialogs/GenericDialog';

const ActionButtons = ({ row }) => {
  return <GenericDialog form="VehicleDepot" id={row.id} data={row} />;
};

const columnsCustom = [
  { name: 'id', sort: true, filter: false },
  { name: 'is_global', omit: true },
  {
    name: 'details',
    label: 'Depot Name',
    sort: true,
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

export default function VehicleDepot({ content }) {
  return (
    <DynamicDataTable
      title="Vehicle Depot"
      urlLink={'vehicle/depot/list/?' + content + '&'}
      columnsCustom={columnsCustom}
      addNew={[<GenericDialog form="VehicleDepot" />]}
      description="Place from where vehicle is managed. You can have multiple depots."
    />
  );
}
