import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import useSettings from "../../../../../../hooks/useSettings";
import FinanceDetails from "./FinanceDetails";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import useTimeline from "../../../../../../hooks/useTimeline";
import moment from "moment";
import { TimelineOppositeContent } from "@mui/lab";

const ListElement = ({ heading, content, contentType }) => {
  return (
    <Box display="flex" alignItems={"center"}>
      <Box flexGrow={1} pr={2}>
        <Typography gutterBottom variant="body2" color="primary">
          <b>{heading} </b>
        </Typography>
      </Box>
      <Box>
        <Typography gutterBottom variant="body2" align="right" width="100%">
          {contentType === "date" && moment(content).format("DD-MM-YYYY")}
          {content}
        </Typography>
      </Box>
    </Box>
  );
};

const Details = ({ details }) => {
  const showFields = [
    {
      type: "Rental Records",
      fields: [
        {
          name: "Dispatched by",
          tag: "['dispatched_by']['first_name']",
          contentType: "text",
        },
        {
          name: "Booking #",
          tag: '["bookingGroup"]',
          contentType: "text",
        },
        {
          name: "Customer",
          tag: '["customer"]["name"]',
          contentType: "text",
        },
        {
          name: "Start Date",
          tag: '["start_date"]',
          contentType: "date",
        },
        {
          name: "End Date",
          tag: '["end_date"]',
          contentType: "date",
        },
        {
          name: "Status",
          tag: '["status"]',
          contentType: "text",
        },
      ],
    },
    {
      type: "Prechecks Due",
      fields: [
        {
          name: "Filled By",
          tag: "['filled_by']['first_name']",
          contentType: "text",
        },
        {
          name: "Expiry Date",
          tag: "['due_date']",
          contentType: "date",
        },
      ],
    },
    {
      type: "Vehicle Assigned",
      fields: [
        { name: "Assigned to", tag: "['driver']['name']", contentType: "text" },
      ],
    },
    {
      type: "VOR History",
      fields: [
        {
          name: "Garage Name",
          tag: "['vortype']['name']",
          contentType: "text",
        },
        { name: "Address", tag: "['vortype']['address']", contentType: "text" },
        { name: "City", tag: "['vortype']['city']", contentType: "text" },
      ],
    },
  ];

  const { settings } = useSettings();

  return (
    <Grid container spacing={3}>
      <Grid
        item
        lg={settings.compact ? 6 : 4}
        md={6}
        xl={settings.compact ? 6 : 3}
        xs={12}
      >
        <FinanceDetails details={details} />
      </Grid>
      {/* <Grid
        item
        lg={settings.compact ? 6 : 6}
        md={6}
        xl={settings.compact ? 6 : 6}
        xs={12}
      >
        <Timeline>
          {details.logs
            .sort((a, b) => b.time - a.time)
            .map((item) => (
              <TimelineItem align="left">
                <TimelineOppositeContent color="text.secondary">
                  {moment(item.time, "YYYY-MM-DD").format("DD-MM-YYYY")}
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color={item?.color} variant={item?.dotVariant}>
                    {item?.icon}
                  </TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Paper elevation={0} variant="outlined">
                    <Box sx={{ width: "100%", p: 1 }}>
                      <Typography variant="h6" color="primary">
                        {item?.action}
                      </Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ width: "100%", p: 1 }}>
                      {Object.keys(item?.values[0] || item?.values)
                        .map((key) => {
                          console.log(
                            item?.values[0]?.[key] || item?.values[key]
                          );
                          return {
                            name: key,
                            value: item?.values[0]?.[key] || item?.values[key],
                          };
                        })
                        ?.map((row) => {
                          return (
                            <ListElement
                              heading={row?.name + " "}
                              content={row?.value}
                              contentType={row?.contentType}
                            />
                          );
                        })}
                    </Box>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
        </Timeline>
      </Grid> */}
    </Grid>
  );
};

export default Details;
