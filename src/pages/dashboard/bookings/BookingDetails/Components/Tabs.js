import React from "react";
import Tabular from "../../../../../Components/DynamicTabs/DynamicTabs";
import {
  // ProjectApplicationModal,
  ProjectActivities,
  BookingOverview,
  Precheck,
  InitialPayment,
  Returned,
} from "../../../../../Components/Dashboard/bookingdetails";

const cases = {
  Booked: 0,
  Initial_Payment: 1,
  Precheck: 2,
  Confirmed: 3,
  Hired: 4,
  Returned: 5,
  Complete: 6,
};

export default function Tabs({
  project,
  data,
  setData,
  getPrecheckHistory,
  updateBookings,
  addVehicles,
  removeVehicle,
  bookingId,
  changeStatus,
}) {
  let content = [
    {
      value: "overview",
      label: "Overview",
      display: true,
      component: (
        <BookingOverview
          getPrecheckHistory={getPrecheckHistory}
          project={project}
          data={data}
        />
      ),
    },
    {
      value: "pre-check",
      label: "Pre-check",
      display: true,
      component: (
        <Precheck
          getPrecheckHistory={getPrecheckHistory}
          data={data}
          addVehicles={addVehicles}
          removeVehicle={removeVehicle}
          disabled={cases[data[0]["status"]] >= 2}
        />
      ),
    },
    {
      value: "initial-payment",
      label: "Initial Payment",
      display: true,
      component: (
        <InitialPayment
          updateBookings={updateBookings}
          data={data}
          setData={setData}
          disabled={cases[data[0]["status"]] >= 3}
        />
      ),
    },
    {
      value: "confirm",
      label: "Confirm",
      display: cases[data[0]["status"]] >= 3,
      component: (
        <ProjectActivities
          data={data}
          setData={setData}
          updateBookings={updateBookings}
          changeStatus={changeStatus}
          disabled={cases[data[0]["status"]] >= 4}
        />
      ),
    },
    {
      value: "onHire",
      label: "On Hire",
      display: cases[data[0]["status"]] >= 4,
    },
    {
      value: "returned",
      label: "Returned",
      display: cases[data[0]["status"]] >= 4,
      component: (
        <Returned
          data={data}
          setData={setData}
          updateBookings={updateBookings}
          changeStatus={changeStatus}
          disabled={cases[data[0]["status"]] >= 5}
        />
      ),
    },
    {
      value: "return-pre-check",
      label: "Return Pre-check",
      display: cases[data[0]["status"]] >= 5,
      component: (
        <Precheck
          getPrecheckHistory={getPrecheckHistory}
          data={data}
          addVehicles={addVehicles}
          removeVehicle={removeVehicle}
          status={cases[data[0]["status"]]}
          disabled={cases[data[0]["status"]] >= 6}
        />
      ),
    },
    {
      value: "final-payment",
      label: "Final Payment",
      display: cases[data[0]["status"]] >= 5,
      component: (
        <InitialPayment
          updateBookings={updateBookings}
          data={data}
          changeStatus={changeStatus}
          setData={setData}
          disabled={cases[data[0]["status"]] >= 5}
        />
      ),
    },
  ];

  return (
    <Tabular
      redirectLink={bookingId}
      initialPath={"details"}
      content={content}
    />
  );
}
