import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';

// const Mark = ({ children }) => {
//   return (
//     <mark
//       style={{
//         backgroundColor: '01ab56',
//         borderRadius: '4px',
//         padding: '4px',
//         color: '#fff',
//         fontWeight: 800,
//       }}
//     >
//       {children}
//     </mark>
//   );
// };

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
          mt: 2,
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
                  sx={{ pt: 8, color: '#fff' }}
                >
                  Free Fleet Management & Tracking System
                </Typography>
                <Typography
                  variant="h1"
                  align="left"
                  style={{ color: '#01ab56' }}
                >
                  Contact Us for Fleet Vantage Support
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
                  Register for Free
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
      <Box>
        <Container maxWidth="md">
          <Typography
            variant="body1"
            sx={{ lineHeight: 2, mt: 4 }}
            align="justify"
          >
            We understand that managing your fleet can be a complex and
            time-consuming task. That's why we offer a web app that provides a
            comprehensive solution to streamline your fleet management
            operations.
            <br />
            <br />
            Our web app is designed to simplify fleet management tasks such as
            vehicle tracking, maintenance scheduling, fuel management, and more.
            With our user-friendly interface and powerful features, you can
            easily manage your fleet from anywhere, at any time.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroSection;
