import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/styles';
import { Box, Card, CardHeader } from '@mui/material';
import { useDashboardContext } from '../../hooks/DashboardContext';
import { labelGenerator } from '../DynamicDataTable/helpers';

export const LineChart = ({ w_id, uniqueId }) => {
  const theme = useTheme();
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

  const series = [
    {
      name: selectedValues[uniqueId]?.column_yAxis
        ? labelGenerator(selectedValues[uniqueId]?.column_yAxis)
        : '',
      data: selectedValues[uniqueId]?.res?.map(
        (n) => n[selectedValues[uniqueId]?.column_yAxis]
      ),
    },
  ];

  const options = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2,
      },
      radius: 2,
      shape: 'circle',
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      categories: selectedValues[uniqueId]?.res?.map(
        (n) => n[selectedValues[uniqueId]?.column_xAxis]
      ),
      title: {
        text: selectedValues[uniqueId]?.column_xAxis
          ? labelGenerator(selectedValues[uniqueId]?.column_xAxis)
          : '',
        offsetY: 90,
        offsetX: 0,
        style: {
          colors: theme.palette.text.primary,
        },
      },
      axisBorder: {
        color: theme.palette.divider,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      position: 'bottom',
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: [
      {
        title: {
          text: selectedValues[uniqueId]?.column_yAxis
            ? labelGenerator(selectedValues[uniqueId]?.column_yAxis)
            : '',
          style: {
            colors: theme.palette.text.primary,
          },
        },
        axisBorder: {
          color: theme.palette.divider,
          show: true,
        },
        axisTicks: {
          color: theme.palette.divider,
          show: true,
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
      },
      {
        axisTicks: {
          color: theme.palette.divider,
          show: true,
        },
        axisBorder: {
          color: theme.palette.divider,
          show: true,
        },
        labels: {
          style: {
            colors: theme.palette.text.secondary,
          },
        },
        opposite: true,
      },
    ],
  };

  return (
    <Card>
      <CardHeader title={selectedValues[uniqueId]?.title} />
      <Box sx={{ p: 1, pb: 1 }} dir="ltr">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={300}
        />
      </Box>
    </Card>
  );
};
