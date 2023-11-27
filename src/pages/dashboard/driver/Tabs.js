import React from "react";
import Tabular from "../../../Components/DynamicTabs/DynamicTabs";
import DriverTable from "./Components/DriverTable";
import VehicleTable from "./Components/VehicleTable";

export default function VehicleAccess() {
  const content = [
    {
      value: "all",
      label: "All",
      display: true,
      component: <DriverTable content="" />,
    },
    {
      value: "active",
      label: "Active",
      display: true,
      component: <DriverTable content="banned=0" />,
    },
    {
      value: "banned",
      label: "Banned",
      display: true,
      component: <DriverTable content="banned=1" />,
    },
    {
      value: "assigned",
      label: "Assigned Vehicles",
      display: true,
      component: <VehicleTable content="banned=0" />,
    },
  ];

  return <Tabular initialPath="drivers" content={content} />;
}
