import React from 'react';
import AreaLineGraph from '../../Graphs/AreaLineGraph';
import { CircularProgress } from '@mui/material';
import useVehicleTrends from './useVehicleTrends';

const tabsTitle = ['Daily', 'Weekly', 'Monthly'];

export default function VehicleTrends() {
  const { loading, datasets } = useVehicleTrends();
  console.log(datasets);
  if (loading) {
    return <CircularProgress />;
  } else {
    return <AreaLineGraph tabsTitle={tabsTitle} data={datasets} />;
  }
}
