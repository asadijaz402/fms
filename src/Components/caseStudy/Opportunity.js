import React from "react";
import { Box, Container, Grid, Typography, Paper } from "@mui/material";

const data = [
  {
    title: "The Opportunity",
    description: `While once limited to large corporations with massive caravans of vehicles, fleet management is now a fast-growing trend in companies of every size. From local neighborhood florists with a couple of vans to nationwide delivery services with thousands of trucks, there are many moving parts involved when it comes to managing a fleet.

        Maximizing efficiency is essential for every business. These days, most are taking every possible step to increase productivity while simultaneously reducing expenses. Utilizing fleet management software can help you achieve these goals from anywhere, no matter where the vehicles are located.`,
  },
  {
    title: "What We Did",
    description: `Managing a fleet comes with many challenges, so streamlining the process through automation is a popular option. Technology is being used more than ever to streamline operations, reduce costs and integrate new systems.

        We worked closely with companies currently managing around 1000 vehicles. We understood their problems, flaws in their systems and gaps.`,
  },
];

const results = [
  {
    title: "1. Manage Fleet Size",
    description: `The daily operations for fleets of any size involve many components and can be difficult to manage effectively. Implementing Fleet Manager provides a platform to view every aspect remotely, even if the vehicles are scattered across the country.`,
  },
  {
    title: "2. Increase Vehicle Life Span",
    description: `Fleet Manager has the ability to track each vehicle via the use of GPS, allowing them to monitor performance and any potential maintenance issues. Staying on top of factors like mileage, tire wear, braking habits, and oil changes means the lifespan of the vehicle can be increased.`,
  },
  {
    title: "3. Improve Safety",
    description: `Fleet management software includes a driving behavior component, which can even include a video recording feature. Fleet drivers’ habits and behaviors are monitored, helping to prevent damage and improve safety.`,
  },
  {
    title: "4. Reduce Cost",
    description: `Built-in tools, such as GPS tracking, help reduce overall costs by providing valuable insight into a fleet. Fleet Management software reports can illustrate how much each vehicle is costing a company, allowing management to make improvements or change direction as needed..`,
  },
  {
    title: "5. Dispatch Improvement",
    description: `Gone are the days of having to radio a dispatcher to find out where a vehicle is and when it will return. Fleet management provides immediate access to fleet locations, vehicle requests, and job performance.`,
  },

  {
    title: "6. Increase Customer Satisfaction",
    description: `Customers love to know exactly where their delivery is and when it will arrive. Fleet management software offers the ability to provide updates in real-time, along with troubleshooting any issues or delays.`,
  },
  {
    title: "7. Optimize Routes",
    description: `By offering real-time notifications, fleet management software provides updates on everything from fuel levels to mapping routes. Managers can avoid interrupting drivers for necessary information, as the reports are constantly updated.`,
  },
  {
    title: "8. Offer Real-Time Notifications",
    description: `Gone are the days of having to radio a dispatcher to find out where a vehicle is and when it will return. Fleet management provides immediate access to fleet locations, vehicle requests, and job performance.`,
  },
  {
    title: "9. Maintain Communication",
    description: `Many vehicles utilizing fleet management software are now equipped with built-in communication tools for easy communication between businesses and their drivers. Hands-free devices keep everyone safe, while also allowing for the exchange of information and relevant updates.`,
  },
  {
    title: "10. Compile Important Data",
    description: `One of the biggest benefits of fleet management is the ability to compile data quickly and thoroughly. From generating reports to uploading statistics, the software can provide the exact numbers a company needs to streamline operations.`,
  },
];
function Opportunity() {
  return (
    <Box p={8} sx={{ bgcolor: "#fff" }}>
      <Container>
        <Grid container spacing={5}>
          {data.map((item) => {
            return (
              <Grid item lg={6}>
                <Paper
                  elevation={3}
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: "40px",
                    height: "100%",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{ color: "#01ab56", whiteSpace: "nowrap" }}
                    gutterBottom
                    pt={2}
                    pb={2}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ color: "#969696", whiteSpace: "pre-line" }}
                    gutterBottom
                    sx={{ letterSpacing: 0.5 }}
                  >
                    {item.description}
                  </Typography>{" "}
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <Box mt={5}>
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <Grid container spacing={5}>
              <Grid item lg={12}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ color: "#01ab56", whiteSpace: "nowrap" }}
                    gutterBottom
                    pt={2}
                    pb={2}
                  >
                    The Results
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ color: "#969696", whiteSpace: "pre-line" }}
                    gutterBottom
                    sx={{ letterSpacing: 0.5 }}
                  >
                    There are two distinct areas that fleet management covers,
                    the vehicles and the drivers. Fleet management software
                    (FMS) is generally used to collect data from a few key areas
                    while the vehicle is in service. That data is then analyzed
                    to reveal areas that need improvement so that adjustments
                    can be made in real-time. <br></br> <br></br>To help with
                    the fleet we have developed the following modules:
                  </Typography>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="left">
                  {results.map((item) => {
                    return (
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ color: "#01ab56", whiteSpace: "nowrap" }}
                          gutterBottom
                          pt={2}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="p"
                          style={{ color: "#969696", whiteSpace: "pre-line" }}
                          gutterBottom
                          sx={{ letterSpacing: 0.5 }}
                        >
                          {item.description}
                        </Typography>{" "}
                      </Box>
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box mt={5}>
          <Paper
            elevation={3}
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <Grid container spacing={5}>
              <Grid item lg={12}>
                <Typography
                  variant="h3"
                  sx={{ color: "#01ab56", whiteSpace: "nowrap" }}
                  gutterBottom
                  pt={2}
                  pb={2}
                >
                  How We Did it
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <Typography
                  variant="p"
                  style={{ color: "#969696", whiteSpace: "pre-line" }}
                  gutterBottom
                  sx={{ letterSpacing: 0.5 }}
                >
                  We started with understanding problems, issues, and gaps in an
                  existing fleet managing company. <br></br> <br></br> After
                  gathering requirements, we drafted a solution and technical
                  architecture. <br></br> <br></br> It helped us to deal with
                  multiple modules required to solve problems in multiple
                  domains, either the vehicle side or the driver side.
                </Typography>
              </Grid>
              <Grid item lg={6}>
                <Typography
                  variant="p"
                  style={{ color: "#969696", whiteSpace: "pre-line" }}
                  gutterBottom
                  sx={{ letterSpacing: 0.5 }}
                >
                  While developing each module we made sure, they are compatible
                  with each other. Should be easy to use and can be modified
                  based on customer requirements. <br></br> <br></br> We went
                  with cloud deployment giving it the ability to be accessed
                  from anywhere around the world. It can be used in a web
                  browser or as a stand-alone application.
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box mt={5}>
          <Paper
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              padding: "40px",
              backgroundColor: "rgb(255, 255, 255)",
            }}
          >
            <Grid container spacing={5}>
              <Grid item lg={12}>
                <Box>
                  <Typography
                    variant="h3"
                    sx={{ color: "#01ab56", whiteSpace: "nowrap" }}
                    gutterBottom
                    pt={2}
                    pb={2}
                  >
                    Our Aim While Developing
                  </Typography>
                  <Typography
                    variant="p"
                    style={{ color: "#969696", whiteSpace: "pre-line" }}
                    gutterBottom
                    sx={{ letterSpacing: 0.5 }}
                  >
                    Make fleet management software an essential tool for smooth
                    operations of the fleet, no matter the size. Tracking the
                    location and condition of the vehicles, maintenance
                    schedules, and fuel usage help manage costs and keeps the
                    equipment working longer.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default Opportunity;
