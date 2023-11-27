import React from "react";
import Details from "./Details";
import Tabular from "../../../../../../Components/DynamicTabs/DynamicTabs";

const Tabs = ({ details }) => {
  let content = [
    {
      value: "invoice_detail",
      label: "details",
      display: true,
      component: <Details details={details} />,
    },
  ];
  return (
    <Tabular
      //   redirectLink={}
      initialPath={"finances/invoice/" + details.id}
      content={content}
    />
  );
};

export default Tabs;
