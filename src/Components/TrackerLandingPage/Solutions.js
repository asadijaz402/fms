import React from 'react';
import { Box, Container, Grid, Button, Paper, Typography } from '@mui/material';
import ModeOfTravelOutlinedIcon from '@mui/icons-material/ModeOfTravelOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MapIcon from '@mui/icons-material/Map';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

const Solutions = () => {
  const data = [
    {
      title: 'Live 24/7 Tracking',
      dec: 'Able to track the location of the vehicle in real-time using GPS or other location-based technologies.',
      icon: <AccessTimeIcon sx={{ fontSize: '3rem', color: '#01ab56' }} />,
    },
    {
      title: 'Replay',
      dec: "We store location data for a certain period of time so that you can view the vehicle's location history.",
      icon: (
        <ModeOfTravelOutlinedIcon sx={{ fontSize: '3rem', color: '#01ab56' }} />
      ),
    },
    {
      title: 'Geo Fencing',
      dec: 'Allow you to create virtual boundaries around a specific area and receive alerts when the vehicle enters or exits that area.',
      icon: <MapIcon sx={{ fontSize: '3rem', color: '#01ab56' }} />,
    },
    {
      title: 'Notifications and Alerts',
      dec: "Provide real-time notifications and alerts via email, SMS, or in-app notifications, so that users can stay updated about the vehicle's location and status.",
      icon: (
        <CircleNotificationsIcon sx={{ fontSize: '3rem', color: '#01ab56' }} />
      ),
    },
    {
      title: 'Reporting',
      dec: "Generate reports that provide insights into the vehicle's usage, including distance traveled, time spent at specific locations, and fuel consumption.",
      icon: (
        <DashboardOutlinedIcon sx={{ fontSize: '3rem', color: '#01ab56' }} />
      ),
    },
    {
      title: 'User-friendly interface',
      dec: 'easy to use and navigate, with a user-friendly interface that allows users to access all features and functions quickly and easily.',
      icon: (
        <DomainVerificationIcon sx={{ fontSize: '3rem', color: '#01ab56' }} />
      ),
    },
  ];
  return (
    <Box sx={{ borderRadius: '0px', backgroundColor: '#F4F5F7' }} pt={4} pb={4}>
      <Container>
        <Box align="center">
          <Typography variant="h6" sx={{ color: '#01ab56' }}>
            Free Fleet Management System
          </Typography>
          <Typography
            variant="h3"
            style={{ color: '#242D38', fontWeight: '700' }}
          >
            Our Solution for your Business
          </Typography>
          <Box pt={2}>
            <Typography style={{ color: '#242D38' }} variant="p">
              Gain The Insight You Need To{' '}
              <mark
                style={{
                  backgroundColor: '01ab56',
                  borderRadius: '4px',
                  padding: '4px',
                  color: '#fff',
                  fontWeight: 800,
                }}
              >
                Manage
              </mark>
              ,{' '}
              <mark
                style={{
                  backgroundColor: '01ab56',
                  borderRadius: '4px',
                  padding: '4px',
                  color: '#fff',
                  fontWeight: 800,
                }}
              >
                Monitor
              </mark>{' '}
              and{' '}
              <mark
                style={{
                  backgroundColor: '01ab56',
                  borderRadius: '4px',
                  padding: '4px',
                  color: '#fff',
                  fontWeight: 800,
                }}
              >
                Grow
              </mark>{' '}
              Your Business.
            </Typography>
          </Box>{' '}
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
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '40px',
                  height: '100%',
                  backgroundColor: 'rgb(255, 255, 255)',
                }}
              >
                <Box
                  p={1.5}
                  sx={{ bgcolor: '#242D38' }}
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '15px',
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="h5"
                  sx={{ color: '#01ab56' }}
                  gutterBottom
                  pt={2}
                  pb={2}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="p"
                  style={{ color: '#969696' }}
                  gutterBottom
                  sx={{ letterSpacing: 0.5 }}
                >
                  {item.dec}
                </Typography>{' '}
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
