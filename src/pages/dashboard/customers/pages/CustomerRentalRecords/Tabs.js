import React from 'react';
import Tabular from '../../../../../Components/DynamicTabs/DynamicTabs';
import BookingsTable from '../../../bookings/Components/Tables/BookingsTable';
import { useParams } from 'react-router-dom';
import { CustomerDetail } from '../../../bookings/Components/Tables/CustomerDetail';

export default function VehicleAccess() {
  const params = useParams();
  const content = [
    {
      value: 'customer_detail',
      display: true,
      label: 'Customer Detail',
      component: <CustomerDetail context={params.customerId} />,
    },
    {
      value: 'bookings_list',
      display: true,
      label: 'Bookings',
      component: <BookingsTable context={'customer=' + params.customerId} />,
    },
  ];

  return (
    <Tabular
      initialPath={
        'customers/bookings/' + params.customerName + '/' + params.customerId
      }
      content={content}
    />
  );
}
