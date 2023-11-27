import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

function Banner() {
  return (
    <Box p={8}>
      <Container>
        <Grid container spacing={3}>
          <Grid item lg={6}>
            <Box>
              <Typography
                variant="h1"
                align="left"
                sx={{ pt: 8, color: "#01ab56" }}
              >
                Fleet Management System - Case Study
              </Typography>
            </Box>
          </Grid>
          <Grid item lg={6}>
            <Box>
              <Box
                align="center"
                width={"100%"}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  src={"/static/landingPage/dashboard.jpg"}
                  height={"50%"}
                  width={"100%"}
                  style={{ borderRadius: "10px" }}
                  alt="dashboard light"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Banner;
