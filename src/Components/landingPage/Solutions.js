import React from "react";
import {
  Box,
  Container,
  Grid,
  // Link,
  Paper,
  Typography,
} from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ModeOfTravelOutlinedIcon from "@mui/icons-material/ModeOfTravelOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";


const Solutions = () => {
  const data = [
    {
      title: "Scheduled Maintenance",
      dec: "Design preventive maintenance schedules based on the mileage or inspection data of the vehicle. Create personalized vehicle maintenance reminders for managers, drivers, and your entire team.",

      icon: (
        <PeopleAltOutlinedIcon sx={{ fontSize: "3rem", color: "#01ab56" }} />
      ),
    },
    {
      title: "Work Order Tracking",
      dec: "Assign maintenance tasks and monitor work order progress. Share information about work-order completion, repair costs, and more. Maximize the efficacy of routine maintenance procedures by automating them.",

      icon: (
        <ModeOfTravelOutlinedIcon sx={{ fontSize: "3rem", color: "#01ab56" }} />
      ),
    },
    {
      title: "Automate Process",
      dec: "Automate your maintenance process from end to end through powerful operational workflows and data integrations. No more manual data entry.",
      icon: <UpdateOutlinedIcon sx={{ fontSize: "3rem", color: "#01ab56" }} />,

    },
    {
      title: "Custom Dashboards",
      dec: "Create custom Dashboards to visualize data. Generate reports on demand. Export or Import data in multiple different formats.",
      icon: (
        <DashboardOutlinedIcon sx={{ fontSize: "3rem", color: "#01ab56" }} />
      ),
    },
    {
      title: "Power House",
      dec: "Connect other applications/software to sync with FMS. Backup and visualize all data in one place. Modular, hence can attach as many plugins as you want.",
      icon: <PowerOutlinedIcon sx={{ fontSize: "3rem", color: "#01ab56" }} />,
    },

    {
      title: "Artificial Intelligence",
      dec: "With the help of AI, applications keep track of all kinds of vehicles. Keep you up to date with maintenance, damages or accidents, insurance, geo-tracking, and more.",
      icon: (
        <PsychologyOutlinedIcon sx={{ fontSize: "3rem", color: "#01ab56" }} />
      ),
    },
  ];
  return (
    <Box
      sx={{
        // backgroundColor: "#ECEBEB",
        background: '#ECEBEB url("/images/bg1.png") ',
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
      pt={4}
      pb={4}>
      <Container>
        <Box align='center'>
          <Typography variant='h6' sx={{ color: "#01ab56" }}>
            Free Fleet Management System
          </Typography>
          <Typography
            variant='h3'
            style={{ color: "#242D38", fontWeight: "700" }}>
            Our Solution for your Business
          </Typography>
          <Box pt={2}>
            <Typography style={{ color: "#242D38" }} variant='p'>
              Gain The Insight You Need To{" "}

              <mark
                style={{
                  backgroundColor: "01ab56",
                  borderRadius: "4px",
                  padding: "4px",
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                Manage
              </mark>
              ,{" "}
              <mark
                style={{
                  backgroundColor: "01ab56",
                  borderRadius: "4px",
                  padding: "4px",
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                Monitor
              </mark>{" "}
              and{" "}
              <mark
                style={{
                  backgroundColor: "01ab56",
                  borderRadius: "4px",
                  padding: "4px",
                  color: "#fff",
                  fontWeight: 800,
                }}
              >
                Grow
              </mark>{" "}
              Your Business.
            </Typography>
          </Box>{" "}
        </Box>
        <Grid
          container
          sx={{
            // display: "grid",
            // gridTemplateColumns: "repeat(3, 1fr)",
            pt: 4,
          }}
          justifyContent="stretch"
          spacing={4}
        >
          {data.map((item) => (
            <Grid item lg={4} md={6} sm={6} xs={12}>
              <Paper
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  padding: "40px",
                  height: "100%",
                  backgroundColor: "rgb(255, 255, 255)",
                }}>

                <Box
                  p={1.5}
                  sx={{ bgcolor: "#242D38" }}
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "15px",
                  }}>
                  {item.icon}
                </Box>
                <Typography
                  variant='h5'
                  sx={{ color: "#01ab56" }}

                  gutterBottom
                  pt={2}
                  pb={2}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant='p'
                  style={{ color: "#969696" }}

                  gutterBottom
                  sx={{ letterSpacing: 0.5 }}
                >
                  {item.dec}
                </Typography>{" "}
                {/* <Box mt={2} sx={{ position: "absolute", bottom: "30" }}>
                  <Link href="#" sx={{ color: "01ab56" }}>
                    Learn more
                  </Link>
                </Box> */}
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ width: '100%', mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="primary" align="center">
            Take control of your fleet and try our vehicle locating feature
            today.
          </Typography>
        </Box>
        <Box mt={2} sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            href="https://demo-fleetvantage.bondwest.co.uk/authentication/login"
            size="large"
            sx={{
              color: '#ffffff',
              backgroundColor: '#01ab56',
              '&:hover': {
                textDecoration: 'none',
                backgroundColor: 'rgb(0, 119, 60)',
                boxShadow:
                  '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
              },
            }}
          >
            Try Demo
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Solutions;
