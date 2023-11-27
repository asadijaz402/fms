import React, { useState } from 'react';
import BookingsTable from '../../../pages/dashboard/bookings/Components/Tables/BookingsTable';
import { TotalVehicles } from '../../Dashboard/analytics';
import HiredVehicles from '../../Dashboard/analytics/HiredVehicles';
import VehicleOffRoad from '../../Dashboard/analytics/VehicleOffRoad';
import VehicleOffRoadNotBillable from '../../Dashboard/analytics/VehicleOffRoadNotBillable';
import VehicleTrends from '../../Dashboard/analytics/VehicleRentTrend/VehicleTrends';
import Table from '../components/Dashboard/Table';

export default function useWidgets() {
  const list = [
    {
      id: 'b_3',
      value: 'Overview',
      label: 'overview',
      component: [
        {
          id: 'o1',
          group: 'overview',
          name: 'Total Vehicles',
          image: '/images/CustomDashboard/overview/totalVehicles.png',
          component: TotalVehicles,
        },
        {
          id: 'o2',
          group: 'overview',
          name: 'Hired Vehicles',
          image: '/images/CustomDashboard/overview/hired.png',
          component: HiredVehicles,
        },

        {
          id: 'o3',
          name: 'OffRoad Vehicles',
          group: 'overview',
          image: '/images/CustomDashboard/overview/offroad.png',
          component: VehicleOffRoad,
        },
        {
          id: 'o4',
          name: 'Not Billable',
          group: 'overview',
          image: '/images/CustomDashboard/overview/notbillable.png',
          component: VehicleOffRoadNotBillable,
        },
      ],
    },
    {
      id: 'b_1',
      value: 'bookings',
      label: 'Tables',
      component: [
        {
          id: 'c1',
          name: 'Table',
          group: 'Tables',
          image: '/images/CustomDashboard/table.png',
          component: Table,
        },
        {
          id: 'c2',
          name: 'Bookings Table',
          group: 'Tables',
          image: '/images/CustomDashboard/graphs.png',
          component: BookingsTable,
        },
      ],
    },
    {
      id: 'b_2',
      value: 'Graphs',
      label: 'Graphs',
      component: [
        {
          id: 'g1',
          name: 'Vehicle Trend',
          group: 'Graphs',
          image: '/images/CustomDashboard/graphs.png',
          component: VehicleTrends,
        },
        {
          id: 'g2',
          name: 'Vehicle Trend',
          group: 'Graphs',
          image: '/images/CustomDashboard/table.png',
          component: VehicleTrends,
        },
      ],
    },
  ];
  //custom layout
  const [componentList, setComponentList] = useState(list);

  return { componentList, setComponentList };
}
