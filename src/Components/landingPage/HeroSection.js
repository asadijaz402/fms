import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';

const Mark = ({ children }) => {
  return (
    <mark
      style={{
        backgroundColor: '01ab56',
        borderRadius: '4px',
        padding: '4px',
        color: '#fff',
        fontWeight: 800,
      }}
    >
      {children}
    </mark>
  );
};

const HeroSection = () => {
  // const image = [
  //   "/static/landingPage/ServiceNow.png",
  //   "/static/landingPage/Paychex.png",
  //   "/static/landingPage/GitHub.png",
  //   "/static/landingPage/Zendesk.png",
  //   "/static/landingPage/Stripe.png",
  // ];

  return (
    <Box style={{ overflow: 'none' }}>
      <Box
        sx={{
          bgcolor: '#242D38',
        }}
      >
        <Container sx={{ pb: 8 }}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box align="center">
                <Typography
                  variant="h6"
                  align="left"
                  component={'h1'}
                  sx={{ pt: 8, color: '#fff' }}
                >
                  Free Fleet Management & Tracking System
                </Typography>
                <Typography
                  variant="h1"
                  align="left"
                  style={{ color: '#01ab56' }}
                >
                  Advance your business with:
                </Typography>

                <Typography
                  variant="h3"
                  align="left"
                  style={{ color: '#fff', mt: 2 }}
                >
                  <TypeAnimation
                    sequence={[
                      'Fleet Automation',
                      1200,
                      'Fleet Optimization',
                      1300,
                      'Customer Care',
                      1000,
                      'Dynamic Dashboards',
                      1250,
                      'Asset Tracking',
                      1150,
                      'Increased Visibility',
                      1400,
                      'Driver Analytics',
                      1100,
                      'Eco Friendly',
                      1100,
                    ]}
                    speed={50}
                    repeat={Infinity}
                  />
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#fff', lineHeight: 2, mt: 4 }}
                  align="left"
                >
                  <Mark>Optimize</Mark> your fleet for sustainability with our{' '}
                  <Mark>eco-friendly web/mobile app</Mark>. Our advanced system
                  tracks real-time data on <Mark>location</Mark>,{' '}
                  <Mark>fuel usage</Mark>, and <Mark>emissions</Mark>, enabling
                  you to reduce your carbon footprint and optimize your routes.
                  Try it today to streamline fleet operations and{' '}
                  <Mark>save money</Mark> while{' '}
                  <Mark>minimizing environmental impact</Mark>.
                </Typography>
              </Box>
              <Box align="left" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  href="https://fleetvantage.bondwest.co.uk/authentication/register"
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
                  Signup for Free
                </Button>
                <Button
                  variant="outlined"
                  href="https://demo-fleetvantage.bondwest.co.uk/authentication/login"
                  size="large"
                  sx={{
                    color: '#01ab56',
                    border: '1px solid rgba(1, 171, 86, 0.5)',
                    ml: 1,
                    '&:hover': {
                      border: '1px solid rgba(1, 171, 86, 1)',
                    },
                  }}
                >
                  Try Demo
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Box
                align="center"
                mt={3}
                width={'100%'}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <img
                  src={'/static/landingPage/DashboardLight.png'}
                  height={'100%'}
                  alt="dashboard light"
                  width={'50%'}
                />
                <img
                  src={'/static/landingPage/DashboardDark.png'}
                  alt="dashboard dark"
                  height={'100%'}
                  width={'50%'}
                  style={{ marginLeft: '-6%' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* <Box sx={{ bgcolor: "#fff" }}>
        <Container>
          <Grid
            container
            align="center"
            style={{
              borderRadius: "0px",
              outerBorder: "0px",
            }}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              pt: 5,
              pb: 5,
              bgcolor: "#ffff",
            }}
          >
            {image.map((item) => (
              <img
                item
                src={item}
                height={60}
                // width={140}
                alt="item"
              />
            ))}
          </Grid>
        </Container>
      </Box> */}
    </Box>
  );
};

export default HeroSection;
