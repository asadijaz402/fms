import React, { useRef, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Hidden,
} from '@mui/material';
import { gsap } from 'gsap';
import { TypeAnimation } from 'react-type-animation';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import PopUp from './PopUp';

const Banner = () => {
  const [openPopUp, setOpenPopUp] = React.useState(false);

  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const imageRef = useRef(null);

  const buttonsRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;

    // Using gsap.to() to animate the image up and down
    const animation = gsap.to(image, {
      y: '+=30',
      duration: 2,
      repeat: -1, // Set the repeat option to infinite (-1)
      yoyo: true, // This option reverses the animation to its original state
    });

    const title = titleRef.current;
    const body = bodyRef.current;
    const buttons = buttonsRef.current;
    const form = formRef.current;
    gsap.from(title, {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: 'power4.out',
    });

    gsap.from(body, {
      duration: 1.5,
      y: 50,
      opacity: 0,
      delay: 0.5,
      ease: 'power4.out',
    });

    gsap.from(buttons, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      delay: 1, // Delay the button animation by 1 second
    });

    gsap.from(form, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power2.out',
      delay: 1.5, // Delay the button animation by 1 second
    });

    // Stopping the animation when the component unmounts
    return () => {
      animation.kill();
    };
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setOpenPopUp(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Box
      // pt={20}
      sx={{
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(-44.84deg, #242d38, #3e4a58)',
        height: '90vh',
        position: 'relative',
      }}
    >
      <video
        src="/video/videobg.mp4"
        autoPlay
        muted
        loop
        style={{
          width: '100%',
          height: '90vh',
          position: 'absolute',
          left: '0',
          top: '0',
          objectFit: 'fill',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          '::before': {
            content: "''",
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      />
      <Container>
        <Grid
          container
          spacing={10}
          sx={{
            alignItems: 'center',
            position: 'relative',
            zIndex: '10',
            // pt: 8,
          }}
        >
          <Grid item xs={12} sm={12} md={12} lg={7}>
            <Box>
              <Typography
                // fontFamily="Roboto Mono"
                variant="h4"
                component={'h1'}
                gutterBottom
                ref={titleRef}
                color="#fff"
              >
                Advance Your Business
                <br />
                <span
                  style={{
                    fontWeight: 700,
                    letterSpacing: '0.005em',
                    fontSize: mobileDevice ? '1.3rem' : '3rem',
                    color: '#01ab56',
                    display: 'inline-block',
                  }}
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
                    ]}
                    speed={50}
                    repeat={Infinity}
                  />
                </span>
              </Typography>

              <Typography
                variant="body2"
                mt={5}
                lineHeight={1.5}
                ref={bodyRef}
                fontFamily="Roboto Mono"
                color="#fff"
              >
                We offer best Fleet Management Software and technology for
                tracking and monitoring your entire fleet of vehicles and trucks
                at FleetVantage - the leading provider in Europe. With our
                advanced Fleet Tracking Software, you can easily manage any kind
                of fleet (vehicles, trucks, equipment, heavy machinery and
                more.) It helps monitor your speed, location, and other
                essential metrics, giving you enhanced control and visibility
                over your operations.
              </Typography>
            </Box>
            <Grid container spacing={2} sx={{ pt: 2 }} ref={buttonsRef}>
              <Grid item xs={12} sm={12} md={3} lg={6}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  component={RouterLink}
                  to="/contactUs"
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
                  Get Free Quote
                </Button>
              </Grid>
              <Grid item xs={12} sm={12} md={3} lg={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={RouterLink}
                  to="https://fms-demo.bondwest.co.uk/authentication/login"
                  size="large"
                  sx={{
                    color: '#01ab56',
                    border: '1px solid rgba(1, 171, 86, 0.5)',
                    '&:hover': {
                      border: '1px solid rgba(1, 171, 86, 1)',
                    },
                  }}
                >
                  Demo
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Hidden lgDown>
            <Grid item xs={12} sm={12} md={4} lg={5}>
              <img
                ref={imageRef}
                height={mobileDevice ? '50%' : '100%'}
                width={mobileDevice ? '50%' : '100%'}
                alt=""
                src={`/images/illustration.png`}
              />
            </Grid>
          </Hidden>
        </Grid>
      </Container>
      <PopUp openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
    </Box>
  );
};

export default Banner;
