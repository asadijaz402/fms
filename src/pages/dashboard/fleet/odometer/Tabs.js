import React from "react";
import Tabular from "../../../../Components/DynamicTabs/DynamicTabs";
import VehicleList from "./Components/Table/Vehicles";

export default function VehicleAccess() {
  const content = [
    {
      value: "vehicles",
      label: "Vehicles",
      component: <VehicleList />,
    },
  ];

  return <Tabular initialPath="odometer" content={content} />;
}
