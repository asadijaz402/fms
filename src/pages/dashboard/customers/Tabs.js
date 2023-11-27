import React from "react";
import Tabular from "../../../Components/DynamicTabs/DynamicTabs";
import CustomerTable from "./Components/CustomerTable";

export default function VehicleAccess() {
  const content = [
    {
      value: "all",
      label: "All",
      display: true,
      component: <CustomerTable content="" />,
    },
    {
      value: "active",
      label: "Active",
      display: true,
      component: <CustomerTable content="banned=0" />,
    },
    {
      value: "banned",
      label: "Banned",
      display: true,
      component: <CustomerTable content="banned=1" />,
    },
  ];

  return <Tabular initialPath="/bookings/customers" content={content} />;
}
