import React from "react";
import Tabular from "../../../Components/DynamicTabs/DynamicTabs";
import CurrentWeekInvoice from "./Components/tables/CurrentWeekInvoice";

export default function VehicleAccess() {
  const content = [
    {
      value: "all",
      display: true,
      label: "Current Week Invoices",
      component: <CurrentWeekInvoice />,
    },
  ];

  return <Tabular initialPath="/finance/invoices/" content={content} />;
}
