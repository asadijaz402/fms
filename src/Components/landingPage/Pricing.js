import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  Switch,
  Typography,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import React from 'react';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#152C5B',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#F2F2FF' : '#F2F2FF',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#01ab56',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    color: '#01ab56',
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#F2F2FF',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Pricing = ({ targetRef }) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const pricing = [
    {
      title: 'FREE Plan',
      dec: 'Best suited for small fleet sizes.',
      req: '1 - 10 Vehicles',
      monthlyPri: 'FREE',
      yearlyPri: 'FREE',
      fixedPri: 'Forever',
      href: 'https://fleetvantage.bondwest.co.uk/authentication/register',
      list: [
        'Unlimited Users',
        'Unlimited Customers',
        '2 Dashboards ',
        'Upto 10 Vehicles/Assets',
        'Upto 12 Drivers',
        '5 Sub Modules Entries',
      ],
    },

    {
      title: 'Silver',
      dec: 'For small to medium fleet size.',
      req: '11 - 100 Vehicles',
      monthlyPri: '£ 3',
      yearlyPri: '£ 2',
      fixedPri: '- per vehicle',
      href: 'https://fleetvantage.bondwest.co.uk/authentication/register?redirect_to=/payment/stripe?plan=2',
      list: [
        'Unlimited Users',
        'Unlimited Customers',
        '5 Dashboards ',
        'Upto 100 Vehicles/Assets',
        'Upto 150 Drivers',
        'Unlimited Sub Modules Entries',
      ],
    },
    {
      title: 'Gold',
      dec: 'For large fleets.',
      req: '101 - 500 Vehicles',
      monthlyPri: '£ 6',
      yearlyPri: '£ 5',
      href: 'https://fleetvantage.bondwest.co.uk/authentication/register?redirect_to=/payment/stripe?plan=3',
      fixedPri: '- per vehicle',
      list: [
        'Unlimited Users',
        'Unlimited Customers',
        '10 Dashboards ',
        'Upto 500 Vehicles/Assets',
        'Upto 750 Drivers',
        'Unlimited Sub Modules Entries',
      ],
    },
  ];

  return (
    <Box
      ref={targetRef}
      id="pricing"
      sx={{
        background: '#c0c2c4',
        overflow: 'hidden',
        position: 'relative',
        pt: 16,
        pb: 8,
      }}
    >
      <img
        src="/images/bg1.png"
        width="100%"
        alt="background"
        height="120%"
        style={{
          position: 'absolute',
          left: '-60rem',
          bottom: '-30rem',
          zIndex: '1',
        }}
      />
      <Container style={{ position: 'relative', zIndex: '3' }}>
        <Box sx={{ alignContent: 'center' }}>
          <Typography variant="h1" style={{ color: 'black' }} align={'center'}>
            Pricing
          </Typography>
          <Typography align={'center'} style={{ color: '#0C0047' }}>
            Free, simple and Scaleable.{' '}
          </Typography>

          <Box display={'flex'} sx={{ justifyContent: 'center' }}>
            <Typography variant="p" lineHeight={2.5} color="black">
              Monthly
            </Typography>
            <IOSSwitch
              onChange={handleChange}
              checked={checked}
              sx={{ m: 1, color: '#01ab56' }}
            />
            <Typography variant="p" lineHeight={2.5} color="black">
              Annualy
            </Typography>
          </Box>
          <Grid
            container
            alignItems={'stretch'}
            spacing={4}
            pt={2}
            display={'flex'}
            sx={{ justifyContent: 'space-around' }}
          >
            {pricing.map((item, index) => (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Paper
                  item
                  key={index}
                  sx={{
                    height: '100%',
                    padding: '50px',
                    color: '#ffff',
                    backgroundColor: '#ffff',
                    transition: 'color 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#242D38',
                      transform: 'scale(1.05)',
                      '& h6, & p, & h2, & span': {
                        color: 'white',
                      },
                    },
                  }}
                  alignContent="center"
                >
                  <Box
                    sx={{ alignContent: 'center', height: '100%' }}
                    align={'center'}
                  >
                    <Typography
                      variant="h6"
                      style={{ color: '#01ab56' }}
                      align={'center'}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      variant="p"
                      color="black"
                      align={'center'}
                      marginTop={8}
                    >
                      {item.dec}
                      <br />
                      {item.req}
                    </Typography>

                    <Typography
                      variant="h2"
                      style={{ color: '#01ab56' }}
                      align={'center'}
                    >
                      {checked ? item.yearlyPri : item.monthlyPri}
                    </Typography>
                    <Typography
                      variant="56"
                      style={{ color: '#01ab56' }}
                      align={'center'}
                    >
                      {item.fixedPri}
                    </Typography>
                    <Button
                      variant="contained"
                      // disabled={!item.href}
                      href={item.href}
                      sx={{
                        color: '#ffffff',
                        backgroundColor: '#01ab56',
                        width: '85%',
                        mt: 2,
                        mb: 2,
                        '&:hover': {
                          textDecoration: 'none',
                          backgroundColor: 'rgb(0, 119, 60)',
                          boxShadow:
                            '0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)',
                        },
                      }}
                    >
                      Select Plan
                    </Button>
                    <List>
                      {item.list.map((list) => (
                        <ListItem style={{ color: 'black' }}>
                          <ListItemAvatar>
                            <CheckCircleRoundedIcon
                              style={{ color: '#01ab56' }}
                            />
                          </ListItemAvatar>
                          <Typography variant="p">{list}</Typography>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing;
