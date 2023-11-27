import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Divider,
  Button,
} from '@mui/material';
import moment from 'moment';

export const Footer = () => {
  const footer = [
    {
      main: 'Quick Links',
      sec: [
        {
          label: 'Pricing',
          link: '/pricing',
        },
        {
          label: 'About Us',
          link: 'https://bondwest.co.uk/about/',
        },
        {
          label: 'Contact Us',
          link: 'https://bondwest.co.uk/contactUs/',
        },
        {
          label: 'Demo',
          link: 'https://demo-fleetvantage.bondwest.co.uk/authentication/login',
        },
        {
          label: 'Register',
          link: 'https://fleetvantage.bondwest.co.uk/authentication/register',
        },
        {
          label: 'Login',
          link: 'https://fleetvantage.bondwest.co.uk/authentication/login',
        },
      ],
    },
    {
      main: 'Social Media',
      sec: [
        {
          label: 'Facebook',
          link: 'https://www.facebook.com/InfoBondWest',
        },
        {
          label: 'Twitter',
          link: 'https://twitter.com/InfoBondWest',
        },
        {
          label: 'LinkedIn',
          link: 'https://www.linkedin.com/company/bondwest',
        },
      ],
    },
  ];
  return (
    <Box sx={{ bgcolor: '#242D38', position: 'relative', zIndex: '3' }} p={5}>
      <Container>
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          // alignItems="center"
        >
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Typography color="#01ab56" variant="h6">
              Fleet Vantage
            </Typography>
            <Box mt={2}>
              <Typography color="white" variant="body1">
                A fully-automated daily vehicle tracking system that gives you
                24/7 visibility into your fleet. FleetVantage provides real-time
                data to help you make informed business decisions, save money
                and improve efficiency.
              </Typography>
            </Box>
          </Grid>

          {footer.map((item) => (
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Typography color="#01ab56" variant="h6">
                {item.main}
              </Typography>
              <Box mt={2}>
                {item.sec.map((data) => {
                  return (
                    <Box mb={1}>
                      <Button
                        fullWidth
                        sx={{
                          p: 0,
                          m: 0,
                          pl: 1,
                          justifyContent: 'flex-start',
                          color: '#fff',
                          textDecoration: 'underline',
                        }}
                        href={data.link}
                      >
                        {data.label}
                      </Button>
                    </Box>
                  );
                })}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box mt={3} mb={3}>
          <Divider />
        </Box>
        <Typography
          pt={4}
          pb={4}
          align="center"
          color="#01ab56"
          variant="body1"
        >
          ©{moment().format('YYYY')} • All Rights Reserved |{' '}
          <Button
            sx={{
              color: '#fff',
              textDecoration: 'underline',
            }}
            href="/privacypolicy"
          >
            Privacy Policy
          </Button>{' '}
          |{' '}
          <Button
            sx={{
              color: '#fff',
              textDecoration: 'underline',
            }}
            href="/termsandconditions"
          >
            Terms and Conditions
          </Button>{' '}
          |{' '}
          <Button
            sx={{
              color: '#fff',
              textDecoration: 'underline',
            }}
            href="https://bondwest.co.uk/"
          >
            BondWest.co.uk
          </Button>
        </Typography>
      </Container>
    </Box>
  );
};
