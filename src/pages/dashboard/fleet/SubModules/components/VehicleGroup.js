import React from 'react';
import DynamicDataTable from '../../../../../Components/DynamicDataTable';
import GenericDialog from '../dialogs/GenericDialog';

const ActionButtons = ({ row }) => {
  return <GenericDialog form="VehicleGroup" id={row.id} data={row} />;
};

const columnsCustom = [
  { name: 'id', sort: true, filter: false },

  {
    name: 'name',
    label: 'Name',
    sort: true,
  },
  {
    name: 'code',
    label: 'Code',
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

export default function VehicleGroup({ content }) {
  return (
    <DynamicDataTable
      title="Vehicle Group"
      urlLink={'vehicle/group/list/?' + content + '&'}
      columnsCustom={columnsCustom}
      addNew={[<GenericDialog form="VehicleGroup" />]}
      description="Vehicle can be divided into groups. Groups can present anything."
    />
  );
}
