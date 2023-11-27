import React from 'react';
import Tabular from '../../../../Components/DynamicTabs/DynamicTabs';
import VehicleTable from './Components/VehicleTable';
import AssetTable from './Components/AssetTable';

export default function AssetAccess() {
  const content = [
    {
      value: 'all',
      label: 'All',
      display: true,
      component: <AssetTable content="" />,
    },
    {
      value: 'active',
      label: 'Active',
      display: true,
      component: <AssetTable content="is_active=true" />,
    },
    {
      value: 'banned',
      label: 'Banned',
      display: true,
      component: <AssetTable content="is_active=false" />,
    },
    {
      value: 'assigned',
      label: 'Assigned Asset',
      display: true,
      component: <VehicleTable content="is_active=true" />,
    },
  ];

  return <Tabular initialPath="list" content={content} />;
}
