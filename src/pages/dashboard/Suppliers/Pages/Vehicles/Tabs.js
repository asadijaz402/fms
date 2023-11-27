import React from "react";
import VehicleListTable from "../../../fleet/vehicles/components/VehicleListTable";
import Tabular from "../../../../../Components/DynamicTabs/DynamicTabs";
import { useParams } from "react-router";

export default function VehicleAccess() {
  const { supplierName, supplierId } = useParams();

  const content = [
    {
      value: "live",
      label: "Live",
      component: (
        <VehicleListTable content={"de_fleeted=0&supplier=" + supplierId} />
      ),
    },
    {
      value: "all",
      label: "All",
      component: <VehicleListTable content={"supplier_id=" + supplierId} />,
    },
    {
      value: "defleeted",
      label: "Defleeted",
      component: (
        <VehicleListTable content={"de_fleeted=1&supplier=" + supplierId} />
      ),
    },
    {
      value: "onhire",
      label: "On Hire",
      component: (
        <VehicleListTable
          content={"hire_status=1&de_fleeted=0&supplier=" + supplierId}
        />
      ),
    },
    {
      value: "offhire",
      label: "Off Hire",
      component: (
        <VehicleListTable
          content={"hire_status=0&de_fleeted=0&supplier=" + supplierId}
        />
      ),
    },
  ];

  return (
    <Tabular
      initialPath={"suppliers/vehicles/" + supplierName + "/" + supplierId}
      content={content}
    />
  );
}
