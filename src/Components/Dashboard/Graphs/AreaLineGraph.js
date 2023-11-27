import React, { useState } from "react";
// import { Line } from "react-chartjs-2";
import Chart from "react-apexcharts";
import { makeStyles } from "@mui/styles";
import { Paper, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import Key from "./components/Key";
import Tabs from "./components/Tabs";
import clsx from "clsx";

const useStyles = makeStyles({
  root: {
    // height: "100%",
  },
  hidden: {
    display: "none",
  },
});

export default function AreaLineGraph({ tabsTitle, data }) {
  const classes = useStyles();
  const [activeTitle, setActiveTitle] = useState(tabsTitle[0]);
  const theme = useTheme();
  const [selectedSeries, setSelectedSeries] = useState([
    "Total",
    "On Hire",
    "Vehicle Off Road",
  ]);

  const handleChange = (event, name) => {
    if (!event.target.checked) {
      setSelectedSeries(selectedSeries.filter((item) => item !== name));
    } else {
      setSelectedSeries([...selectedSeries, name]);
    }
  };

  const chartSeries = data[activeTitle].datasets.filter((item) =>
    selectedSeries.includes(item.name)
  );

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: chartSeries.map((item) => item.color),
    dataLabels: {
      enabled: false,
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
    legend: {
      show: false,
    },
    markers: {
      hover: {
        size: undefined,
        sizeOffset: 2,
      },
      radius: 2,
      shape: "circle",
      size: 4,
      strokeWidth: 0,
    },
    stroke: {
      curve: "smooth",
      // lineCap: "butt",
      width: 3,
    },
    theme: {
      mode: theme.palette.mode,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
      },
      axisTicks: {
        color: theme.palette.divider,
        show: true,
      },
      categories: data[activeTitle].xaxis.dataPoints,
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: [
      {
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
    <Paper className={classes.root}>
      <Box p={2}>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography variant="h6" color="textPrimary">
              Vehicle Trends
            </Typography>
          </Box>
          <Box>
            <Tabs
              tabsTitle={tabsTitle}
              setActiveTitle={setActiveTitle}
              activeTitle={activeTitle}
            />
          </Box>
        </Box>
        <Box>
          <Key
            selectedSeries={selectedSeries}
            handleChange={handleChange}
            legend={data.legend}
          />
        </Box>
        <Box mt={3}>
          {tabsTitle.map((title) => {
            return (
              <Box
                className={clsx({ [classes.hidden]: activeTitle !== title })}
              >
                <Chart
                  height="393"
                  options={chartOptions}
                  series={chartSeries}
                  type="line"
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Paper>
  );
}
