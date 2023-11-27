import React from "react";
import UserListTable from "./components/UserListTable";
import Tabular from "../../../Components/DynamicTabs/DynamicTabs";

export default function VehicleAccess() {
  const content = [
    {
      value: "all",
      label: "All",
      component: <UserListTable content="" />,
    },
    {
      value: "is_active",
      label: "Active",
      component: <UserListTable content="is_active=1" />,
    },
    {
      value: "deleted",
      label: "Deleted",
      component: <UserListTable content="is_active=0" />,
    },
  ];

  return <Tabular initialPath="users" content={content} />;
}
