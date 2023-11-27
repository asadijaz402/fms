import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const Team = () => {
  return (
    <Box sx={{ bgcolor: "#fff", border: "none" }}>
      <Box
        sx={{
          borderRadius: "0px",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container sx={{ pb: 3, pt: 3 }}>
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item lg={6}>
              <Box
                style={{
                  textAlign: "",
                  AlignItems: "center",
                }}
              >
                <Typography
                  sx={{ color: "#01ab56", mb: 2 }}
                  variant="h2"
                  align="center"
                >
                  Contact Us
                </Typography>
                <Typography
                  sx={{ color: "#0C0047", lineHeight: 1.8 }}
                  align="center"
                  variant="body1"
                >
                  Contact us without wasting more time for improved digital
                  accessibility. Questions? Email us at{" "}
                  <b>info@bondwest.co.uk</b>
                </Typography>
              </Box>
            </Grid>
            {/* <Grid item lg={6}>
              <Box item pt={4} pb={4}>
                <img
                  src="/static/landingPage/DashBoard.png"
                  alt="Product Screenshot"
                  style={{ overFlow: "hide", width: "100%" }}
                />
              </Box>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Team;
