import React from "react";
import VehicleListTable from "./components/VehicleListTable";
import Tabular from "../../../../Components/DynamicTabs/DynamicTabs";
import VORList from "./VOR/Components/VORList";

export default function VehicleAccess() {
  const content = [
    {
      value: "live",
      label: "Live",
      component: <VehicleListTable content="de_fleeted=0" />,
    },
    {
      value: "all",
      label: "All",
      component: <VehicleListTable content="" />,
    },
    {
      value: "defleeted",
      label: "Defleeted",
      component: <VehicleListTable content="de_fleeted=1" />,
    },
    {
      value: "onhire",
      label: "On Hire",
      component: <VehicleListTable content="hire_status=1&de_fleeted=0" />,
    },
    {
      value: "offhire",
      label: "Off Hire",
      component: <VehicleListTable content="hire_status=0&de_fleeted=0" />,
    },
    {
      value: "VOR_garage",
      label: "VOR Garages",
      component: <VORList />,
    },
  ];

  return (
    <>
      <Tabular initialPath="vehicles" content={content} />
    </>
  );
}
