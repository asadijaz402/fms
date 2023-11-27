import React from 'react';
import Card from '../../../Card/Card';
import { useDashboardContext } from '../../hooks/DashboardContext';

export default function TotalVehicles({ uniqueId, w_id }) {
  const { selectedValues, fetchDataForWidget } = useDashboardContext();
  const title =
    selectedValues &&
    selectedValues[uniqueId] &&
    selectedValues[uniqueId].title;

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (selectedValues[uniqueId]?.res) {
        fetchDataForWidget(w_id, uniqueId);
      }
    }, 300000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  return <Card primary={title} primaryCount={selectedValues[uniqueId]?.res} />;
}
