import React from "react";
import BookMOT from "./MOT/BookMOT";
import TaxTable from "./Tax/TaxTable";
import Tabular from "../../../../Components/DynamicTabs/DynamicTabs";

export default function Tabs() {
  const content = [
    {
      value: "mot_bookings",
      label: "MOT",
      component: <BookMOT />,
    },
    {
      value: "road_tax_bookings",
      label: "Road Tax",
      component: <TaxTable />,
    },
  ];

  return <Tabular initialPath="gov" content={content} />;
}
