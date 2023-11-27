import React from "react";
import Tabular from "../../../../Components/DynamicTabs/DynamicTabs";
import {
  VehicleTypes,
  VehicleManufacturer,
  VehicleDepot,
  VehicleGroup,
  VehicleGarage,
  VehicleManufacturerGarage,
} from "./components";

export default function VehicleSubModules() {
  const content = [
    {
      value: "types",
      label: "Types",
      component: <VehicleTypes content="" />,
    },
    {
      value: "manufacturer",
      label: "Manufacturer",
      component: <VehicleManufacturer content="" />,
    },
    {
      value: "depot",
      label: "Depot",
      component: <VehicleDepot content="" />,
    },
    {
      value: "group",
      label: "Group",
      component: <VehicleGroup content="" />,
    },
    {
      value: "garage",
      label: "Garages",
      component: <VehicleGarage content="" />,
    },
    {
      value: "manufacturer_garage",
      label: "Manufacturer Garages",
      component: <VehicleManufacturerGarage content="" />,
    },
  ];

  return <Tabular initialPath="submodules" content={content} />;
}
