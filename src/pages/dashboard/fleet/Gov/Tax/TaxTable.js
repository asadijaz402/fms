import React from "react";
import moment from "moment";
import DynamicMUITable from "../../../../../Components/DynamicMUITable";
import ProfileCard from "../../../../../Components/Profilecard/Card";
import TaxUpdate from "./Dialogs/TaxUpdate";

const DateFormat = (value) => {
  return moment(value, "YYYY-MM-DDThh:mm").format("ddd Do MMM YYYY");
};

const VehicleProfileCard = (value, tableMeta, updateValue) => {
  return (
    <ProfileCard
      reg_number={value.vehicle.vehicle_reg_no}
      vehicle_id={value.id}
    />
  );
};

const ActionButtons = (value, tableMeta, updateValue) => {
  return (
    <>
      <TaxUpdate rowId={value} method="put" />
    </>
  );
};

const columnsCustom = [
  { name: "id", sort: true, filter: false, display: false },

  {
    name: "tax",
    label: "Reg Number",
    vehicle: true,
    sort: true,
    comp: VehicleProfileCard,
  },
  {
    label: "Due Date",
    name: "due_date",
    comp: DateFormat,
    sort: true,
  },
  {
    name: "newColumnArray",
    new: [
      {
        name: "id",
        label: "Action",
        comp: ActionButtons,
      },
    ],
  },
];

export default function TaxTable() {
  return (
    <DynamicMUITable
      title="Owned Vehicles upcoming Road Tax"
      urlLink="vehicle_accessories/tax/list/?"
      columnsCustom={columnsCustom}
    />
  );
}
