import React from 'react';
import Details from './Details';
import Tabular from '../../../../../Components/DynamicTabs/DynamicTabs';
import AssetTable from './AssetTable';

const DetailTabs = ({ details }) => {
  let content = [
    {
      value: 'details',
      label: 'details',
      display: true,
      component: <Details details={details} />,
    },
    {
      value: 'assigned',
      label: 'Assgined to',
      display: true,
      component: <AssetTable content={'assigned=' + details.id} />,
    },
  ];

  return (
    <Tabular
      //   redirectLink={}
      initialPath={'details/' + details.id}
      content={content}
    />
  );
};

export default DetailTabs;
