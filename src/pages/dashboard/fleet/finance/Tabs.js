import React from 'react';
import Tabular from '../../../../Components/DynamicTabs/DynamicTabs';
import FinanceList from './Components/Table/Finance';

export default function VehicleAccess() {
  const content = [
    {
      value: 'list',
      label: 'List',
      component: <FinanceList />,
    },
  ];

  return <Tabular initialPath="invoice" content={content} />;
}
