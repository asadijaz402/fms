import React from "react";
import Tabular from "src/Components/DynamicTabular";
import MyCalendar from "src/Components/TimeLine";
import VORList from "./Components/VORList";
import VehicleList from "./Components/VehicleList";

export default function VOR({ history }) {
  const content = [
    {
      value: "",
      label: "My Outlook",
      component: <MyCalendar default="all" />,
    },
    {
      value: "#VOR",
      label: "VOR Locations",
      component: <VORList history={history} />,
    },
    {
      value: "#History",
      label: "History",
      component: <VehicleList />,
    },
  ];

  return <Tabular content={content} history={history} />;
}
