import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
function Insight() {
  return (
    <Box sx={{ borderRadius: "0px", backgroundColor: "#F4F5F7" }} p={8}>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
        >
          <Box>
            <Typography variant="h4" gutterBottom sx={{ color: "#01ab56" }}>
              #1 Fleet Management System
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" gutterBottom sx={{ color: "#242D38" }}>
              Gain The Insight You Need To Manage, Monitor And Grow Your
              Business.
            </Typography>
          </Box>
          <Box>
            <Typography variant="p" gutterBottom sx={{ color: "#242D38" }}>
              FMS (Fleet Management System) is a fully-automated daily vehicle
              tracking system that gives you 24/7 visibility into your fleet.
              FMS provides real-time data to help you make informed business
              decisions, save money and improve efficiency. You can view
              comprehensive reports, schedule service appointments, and generate
              custom alerts for any vehicle or driver.
            </Typography>
          </Box>
          <Box mt={5}>
            <Button
              variant="contained"
              size="large"
              href="https://fleetvantage.bondwest.co.uk/authentication/login"
              sx={{
                color: "#ffffff",
                backgroundColor: "#01ab56",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: "rgb(0, 119, 60)",
                  boxShadow:
                    "0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)",
                },
              }}
            >
              Try Demo
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Insight;
