import React from "react";
import Tabular from "../../../Components/DynamicTabs/DynamicTabs";
import SuppliersTable from "./components/SuppliersTable";

export default function VehicleAccess() {
  const content = [
    {
      value: "all",
      label: "All",
      component: <SuppliersTable content="" />,
    },
    // {
    //   value: "is_active",
    //   label: "Active",
    //   component: <UserListTable content="is_active=1" />,
    // },
    // {
    //   value: "deleted",
    //   label: "Deleted",
    //   component: <UserListTable content="is_active=0" />,
    // },
  ];

  return <Tabular initialPath="suppliers" content={content} />;
}
