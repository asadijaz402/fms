import React from "react";
import Tabular from "../../../../../../Components/DynamicTabs/DynamicTabs";
import BookingsTable from "../../../../bookings/Components/Tables/BookingsTable";
import { useParams } from "react-router-dom";

export default function VehicleAccess() {
  const params = useParams();
  const content = [
    {
      value: "bookings_list",
      display: true,
      label: "Bookings",
      component: <BookingsTable context={"vehicle=" + params.vehicleId} />,
    },
  ];

  return (
    <Tabular
      initialPath={
        "bookings/customers/bookings/" +
        params.vehicleNumber +
        "/" +
        params.vehicleId
      }
      content={content}
    />
  );
}
