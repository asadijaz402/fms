import React from "react";
import Tabular from "../../../Components/DynamicTabs/DynamicTabs";
import BookingsTable from "./Components/Tables/BookingsTable";
import BookingTableGroup from "./Components/Tables/BookingsTableGroup";

export default function VehicleAccess() {
  const content = [
    {
      value: "bookings_list",
      label: "Bookings",
      component: <BookingsTable context="" />,
    },
    {
      value: "we_collect",
      label: "We Collect",
      component: <BookingsTable context="collection_at_depot=True" />,
    },
    {
      value: "we_deliver",
      label: "We Deliver",
      component: <BookingsTable context="deliver=True" />,
    },
    {
      value: "we_deliver_collect",
      label: "We Deliver & Collect",
      component: (
        <BookingsTable context="deliver=True&collection_at_depot=True" />
      ),
    },
    {
      value: "group",
      label: "Group",
      component: <BookingTableGroup context="booking_group_unique=True" />,
    },
  ];

  return <Tabular initialPath="vehicles" content={content} />;
}
