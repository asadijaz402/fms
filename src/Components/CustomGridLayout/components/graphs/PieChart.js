import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader } from '@mui/material';
import { useDashboardContext } from '../../hooks/DashboardContext';

export const PieChart = ({ uniqueId, w_id }) => {
  const { selectedValues, fetchDataForWidget } = useDashboardContext();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (selectedValues[uniqueId]?.res) {
        fetchDataForWidget(w_id, uniqueId);
      }
    }, 300000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);

  const series = selectedValues[uniqueId]?.res?.map(
    (n) => n[selectedValues[uniqueId]?.column_yAxis]
  );

  const options = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    labels: selectedValues[uniqueId]?.res?.map((n) => {
      if (selectedValues[uniqueId]?.column_xAxis_label) {
        return n[
          selectedValues[uniqueId]?.column_xAxis +
            '__' +
            selectedValues[uniqueId]?.column_xAxis_label
        ];
      } else {
        return n[selectedValues[uniqueId]?.column_xAxis];
      }
    }),
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title={selectedValues[uniqueId]?.title} />
      <Box sx={{ p: 1, pb: 1 }} dir="ltr">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={300}
        />
      </Box>
    </Card>
  );
};
