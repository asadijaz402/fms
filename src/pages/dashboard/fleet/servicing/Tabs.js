import React from "react";
import ServicingListTable from "./components/ServicingListTable";
import Tabular from "../../../../Components/DynamicTabs/DynamicTabs";
import TyresBookings from "./tyres/Components/TyresBooking";
import BrakesBooking from "./brakes/Components/BrakesBooking";
import BrakeServiceHistory from "./brakes/Components/BrakeServiceHistory";

export default function VehicleAccess() {
  const content = [
    {
      value: "service_bookings",
      display: true,
      label: "Service Bookings",
      component: <ServicingListTable />,
    },
    {
      value: "tyres_bookings",
      display: true,
      label: "Tyres Bookings",
      component: <TyresBookings />,
    },
    {
      value: "brakes_bookings",
      label: "Brakes Bookings",
      display: true,
      component: <BrakesBooking />,
    },
    {
      value: "brakes_history",
      label: "Brakes History",
      display: true,
      component: <BrakeServiceHistory />,
    },
  ];

  return <Tabular initialPath="servicing" content={content} />;
}
