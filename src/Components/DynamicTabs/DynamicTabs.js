import React, { useState, useEffect } from "react";
import {
  // Card,
  Tabs,
  Tab,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

export default function Tabular({
  content,
  redirectLink = false,
  initialPath = false,
}) {
  const [value, setValue] = useState("");
  let navigate = useNavigate();
  let { tabName } = useParams();

  useEffect(() => {
    setValue(tabName);
  }, [tabName]);

  const handleChange = (event, newValue) => {
    if (!redirectLink && !initialPath) {
      navigate("../" + newValue);
    } else if (initialPath && !redirectLink) {
      navigate("../" + initialPath + "/" + newValue);
    } else if (initialPath && redirectLink) {
      navigate("../" + initialPath + "/" + newValue + "/" + redirectLink);
    } else {
      navigate("../" + newValue + "/" + redirectLink);
    }
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        scrollButtons="auto"
        textColor="primary"
        variant="scrollable"
      >
        {content.map((val) => {
          if (Object.keys(val).includes("display")) {
            return (
              val.display && (
                <Tab key={val.value} value={val.value} label={val.label} />
              )
            );
          } else {
            return <Tab key={val.value} value={val.value} label={val.label} />;
          }
        })}
      </Tabs>
      <Divider />
      <Box sx={{ mt: 3 }}>
        {content.map((val) => {
          if (Object.keys(val).includes("display")) {
            return (
              val.display && (
                <TabPanel key={val.value} value={value} index={val.value}>
                  {val.component}
                </TabPanel>
              )
            );
          } else {
            return (
              <TabPanel key={val.value} value={value} index={val.value}>
                {val.component}
              </TabPanel>
            );
          }
        })}
      </Box>
    </>
  );
}
