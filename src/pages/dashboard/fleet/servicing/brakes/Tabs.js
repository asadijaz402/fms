import React from "react";
import ServicingListTable from "./components/ServicingListTable";
import Tabular from "../../../../components/DynamicTabs/DynamicTabs";

export default function VehicleAccess() {
  const content = [
    {
      value: "all",
      label: "Servicing",
      component: <ServicingListTable content="de_fleeted=0" />,
    },
  ];

  return <Tabular content={content} />;
}
