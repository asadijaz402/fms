import React from "react";
import Tabular from "../../../Components/DynamicTabs/DynamicTabs";
import AccidentListTable from "./AccidentList/AccidentList";
// import KanbanView from "./KanbanView";
import { useLocation } from "react-router-dom";
import BreakdownListTable from "./AccidentList/BreakdownList";
export default function VehicleAccess() {
  const location = useLocation();
  const content = [
    {
      value: "table",
      label: "List",
      display: true,
      component:
        "/claims/Breakdown/table" === location.pathname ? (
          <BreakdownListTable />
        ) : (
          <AccidentListTable />
        ),
    },
    // {
    //   value: "kanban",
    //   label: "Kanban",
    //   component: <KanbanView />,
    // },
  ];

  return <Tabular content={content} />;
}
