import React from "react";
import { makeStyles } from "@mui/styles";

import PropTypes from "prop-types";

import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import MyCalendar from "../../../../../Components/TimeLine";
import Vehicles from "./Table";
import InvoicesCurrentWeek from "./InvoicesCurrentWeek";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Tabular = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#5babe4" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {/* <Tab key={0} label="My Outlook" {...a11yProps(0)} /> */}
          <Tab key={1} label="Transactions" {...a11yProps(1)} />
          <Tab key={2} label="Invoices (Current Week)" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      {/* <TabPanel value={value} index={0}>
        <Box className="cardsShadow">
          <MyCalendar default="all" key={3} />
        </Box>
      </TabPanel> */}
      <TabPanel value={value} index={0}>
        <Vehicles
          resReceived={props.resReceived}
          key={4}
          history={props.history}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InvoicesCurrentWeek
          curentWeekResponse={props.curentWeekResponse}
          key={5}
          history={props.history}
        />
      </TabPanel>
    </div>
  );
};

export default Tabular;
