import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
function QuickLinks() {
  return (
    <Box sx={{ borderRadius: '0px' }} p={8}>
      <Container>
        <Box>
          <Box textAlign='center'>
            <Typography variant='h2' gutterBottom sx={{ color: '#01ab56' }}>
              Quick Links
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={5}>
              <Grid item lg={6}>
                <Button
                  variant='contained'
                  fullWidth
                  size='large'
                  href='https://fleetvantage.bondwest.co.uk/authentication/register'
                  sx={{
                    color: '#ffffff',
                    backgroundColor: '#01ab56',
                    '&:hover': {
                      textDecoration: 'none',
                      backgroundColor: 'rgb(0, 119, 60)',
                      boxShadow:
                        '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                    },
                  }}>
                  Register for free{' '}
                </Button>
              </Grid>
              <Grid item lg={6}>
                <Button
                  variant='contained'
                  fullWidth
                  size='large'
                  href='https://fleetvantage.bondwest.co.uk/authentication/login'
                  sx={{
                    color: '#ffffff',
                    backgroundColor: '#01ab56',
                    '&:hover': {
                      textDecoration: 'none',
                      backgroundColor: 'rgb(0, 119, 60)',
                      boxShadow:
                        '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                    },
                  }}>
                  Try Demo
                </Button>
              </Grid>
              <Grid item lg={12}>
                <Box display='flex' flexDirection='column' alignItems='center'>
                  <Typography
                    sx={{ color: '#01ab56', mb: 2 }}
                    variant='h5'
                    align='center'>
                    Contact Us
                  </Typography>
                  <Typography
                    sx={{ lineHeight: 1.8 }}
                    align='center'
                    variant='body1'>
                    Contact us without wasting more time for improved digital
                    accessibility. Questions? Email us at{' '}
                    <b>info@bondwest.co.uk</b>
                  </Typography>
                  <Button
                    variant='contained'
                    size='large'
                    href='https://fleetvantage.bondwest.co.uk/authentication/register'
                    sx={{
                      mt: 3,
                      color: '#ffffff',
                      backgroundColor: '#01ab56',
                      '&:hover': {
                        textDecoration: 'none',
                        backgroundColor: 'rgb(0, 119, 60)',
                        boxShadow:
                          '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                      },
                    }}>
                    Contact Us{' '}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default QuickLinks;
