import React from 'react';
import Tabular from '../../../../../Components/DynamicTabs/DynamicTabs';
import VehicleTable from '../../Components/VehicleTable';
import { useParams } from 'react-router-dom';
import { DriverDetail } from '../../DriverDetail';

export default function VehicleAccess() {
  const params = useParams();
  const content = [
    {
      value: 'driver_detail',
      display: true,
      label: 'Driver Detail',
      component: <DriverDetail content={params.driverId} />,
    },
    {
      value: 'all',
      display: true,
      label: 'Driver Vehicle Records',
      component: <VehicleTable content={'driver__id=' + params.driverId} />,
    },
  ];

  return (
    <Tabular
      initialPath={
        'driver/records/' + params.driverName + '/' + params.driverId
      }
      content={content}
    />
  );
}
