import React from 'react';
import Tabular from '../../../../Components/DynamicTabs/DynamicTabs';
import BookingsTable from '../../bookings/Components/Tables/BookingsTable';
import { Details } from './Components';
import ViewServiceTable from '../servicing/ServiceHistory/ViewServiceTable';
import ViewTyreServiceTable from '../servicing/tyres/Components/Table/ViewTyreServiceTable';
import ViewBrakeServiceTable from '../servicing/brakes/Components/Table/ViewBrakeServiceTable';
import useGetHistory from './hooks/useGetHistory';
import VORHistoryTable from './Components/Details/VORHistoryTable';
import VehicleTable from '../../driver/Components/VehicleTable';
import Tracker from './Components/Tracker';
import AssetTable from '../asset/Components/AssetTable';
import { PrecheckHistoryTable } from './Components/Details/PrecheckHistoryTable';
import useInstallerContext from '../../../../hooks/useInstallerContext';
import Vehicles from "../odometer/Components/Table/Vehicles";

export default function Tabs({ details }) {
  const service = useGetHistory(details, "service_history");
  const tyre_service = useGetHistory(details, "tyre_service_history");
  const brake_service = useGetHistory(details, "brake_service_history");
  const vor_history = useGetHistory(details, "vor_history");
  const precheck_history = useGetHistory(details, "precheck_history");

  const { installerHidden } = useInstallerContext();

  let content = [
    {
      value: "details",
      label: "details",
      display: true,
      component: <Details details={details} />,
    },
    {
      value: "rental_records",
      label: "Rental Records",
      display: !installerHidden("rentals"),
      component: <BookingsTable context={"vehicle=" + details.id} />,
    },
    {
      value: "odometer_and_fuel",
      label: "Odometer And Fuel",
      display: true,
      component: <Vehicles data={details.id} />,
    },
    {
      value: "service_history",
      label: "Service History",
      display: true,
      component: <ViewServiceTable data={service.data} />,
    },
    {
      value: "tyre_service_history",
      label: "Tyre Service History",
      display: true,
      component: <ViewTyreServiceTable data={tyre_service.data} />,
    },
    {
      value: "brake_service_history",
      label: "Brake Service History",
      display: true,
      component: <ViewBrakeServiceTable data={brake_service.data} />,
    },
    {
      value: "vor_history",
      label: "VOR History",
      display: true,
      component: <VORHistoryTable data={vor_history.data} />,
    },
    {
      value: "drivers",
      label: "Driver History",
      display: !installerHidden("drivers"),
      component: <VehicleTable content={"vehicle__id=" + details.id} />,
    },
    {
      value: "tracker",
      label: "Tracker",
      display: !installerHidden("tracker"),
      component: <Tracker />,
    },
    {
      value: 'assets',
      label: 'Assets',
      display: !installerHidden('assets'),
      component: <AssetTable content={'assigned__vehicle=' + details.id} />,
    },
    {
      value: 'precheck_history',
      label: 'Prechecks History',
      display: true,
      component: (
        <PrecheckHistoryTable data={precheck_history.data} details={details} />
      ),
    },
  ];

  return (
    <Tabular
      //   redirectLink={}
      initialPath={"vehicle/" + details.id}
      content={content}
    />
  );
}
