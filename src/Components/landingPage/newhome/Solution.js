import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Typography, Box, Container, Grid, Paper, Button } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ModeOfTravelOutlinedIcon from '@mui/icons-material/ModeOfTravelOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PowerOutlinedIcon from '@mui/icons-material/PowerOutlined';
import './slider.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { gsap } from 'gsap';
const data = [
  {
    title: 'Fleet Maintenance Software ',
    sub_title: `Optimize Your Fleet's Performance`,
    dec: `Streamline Your Maintenance Workflow with Our Fleet Maintenance Software Our powerful tracking and monitoring tools enable you to stay on top of your vehicle/fleet maintenance needs and ensure that your fleet is running at its best. With our software, you can track all aspects of fleet maintenance, including scheduling, maintenance history, and costs. Our system is designed to streamline your operations and save you time and money by automating maintenance workflows and providing real-time data and analytics.
    .`,
    icon: (
      <PeopleAltOutlinedIcon sx={{ fontSize: '2.5rem', color: '#01ab56' }} />
    ),
  },
  {
    title: 'Optimize Your Business Process',
    dec: `Are you looking to optimize your business process and improve your bottom line?
    Our cutting-edge solutions can help you streamline your operations, save you time and money, and provide you with the tools you need to stay ahead of the competition. From advanced tracking and monitoring tools to customizable reports and user-friendly interfaces, our software is designed to provide you with the best fleet management experience. Our software can help you take control of your fleet, reduce downtime, and ensure that your vehicles and trucks are always running at peak performance.
    `,
    icon: (
      <ModeOfTravelOutlinedIcon sx={{ fontSize: '2.5rem', color: '#01ab56' }} />
    ),
  },
  {
    title: 'Custom Dashboards for Comprehensive Data Management',
    dec: `Tailor Your Data Management to Your Specific Needs with Our Custom Dashboard Services.
    Having access to a customizable dashboard can make all the difference in managing your data effectively. Our customizable dashboard solutions enable you to personalize your data management to suit your specific needs. With real-time analytics and a user-friendly interface, you can easily access the information you need to make informed decisions. With our custom dashboard services, you can take control of your data and manage it in a way that makes sense for your business.`,
    icon: <UpdateOutlinedIcon sx={{ fontSize: '2.5rem', color: '#01ab56' }} />,
  },
  {
    title: 'Fleet Monitoring System for Efficient Vehicle Management',
    sub_title: `Real-Time Tracking and Monitoring`,
    dec: `Simplify Your Fleet Management with Our User-Friendly Fleet Monitoring System
    Our fleet monitoring system is designed to provide the best tracking, software, monitoring, and management tools available. With real-time tracking and monitoring capabilities, you can stay on top of your fleet's location and performance, making informed decisions and taking corrective action where necessary. Our software provides comprehensive management tools, allowing you to optimize your routes, improve response times, and ensure the safety and security of your fleet
    `,
    icon: (
      <DashboardOutlinedIcon sx={{ fontSize: '2.5rem', color: '#01ab56' }} />
    ),
  },
  {
    title: 'Fleet tracking system',
    dec: 'Our Fleet management system offers a comprehensive software solution that simplifies the task of tracking and monitoring your fleet of vehicles and trucks. With our state-of-the-art GPS tracking feature, you can effortlessly locate your fleet in real-time and instantly identify the precise location of any vehicle at any given time. This cutting-edge technology empowers you to optimize routes, enhance response times, and guarantee the safety and protection of your entire fleet. Our advanced software and monitoring tools enable you to manage your fleet seamlessly and utilize data-driven insights to ensure that your vehicles operate at their highest potential.',
    icon: <PowerOutlinedIcon sx={{ fontSize: '2.5rem', color: '#01ab56' }} />,
  },
  // {
  //   title: "Safety and Incident Reporting",
  //   dec: "Help your employees get through all of the necessary audits and reports quickly and easily. FleetVantage flexibility makes it simple to tailor it to your operations, ensuring that all tests are performed and data is collected as required for reporting.",
  //   icon: (
  //     <PsychologyOutlinedIcon sx={{ fontSize: "2.5rem", color: "#01ab56" }} />
  //   ),
  // },
  // {
  //   title: "Reporting",
  //   dec: "Your fleet's information and maintenance history can be accessed in one location. Dig deeper into asset-specific data and get the real-time insights that will help you identify trends and make informed decisions.",
  //   icon: (
  //     <PsychologyOutlinedIcon sx={{ fontSize: "2.5rem", color: "#01ab56" }} />
  //   ),
  // },
];

function Solution() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleLearnMoreClick = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(-1); // Toggle back to original format
    } else {
      setExpandedIndex(index); // Expand the clicked slider
    }
  };

  const handleSliderChange = (index) => {
    setCenterIndex(index);
    setExpandedIndex(-1); // Restore to default value
  };

  const titleRef = useRef(null);
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '10px',
    slidesToShow: mobileDevice ? 1 : 3,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    afterChange: handleSliderChange,
  };

  var settings2 = {
    // centerMode: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const title = titleRef.current;
    gsap.from(title, {
      duration: 1.5,
      y: 50,
      opacity: 0,
      ease: 'power4.out',
    });
  }, []);

  return (
    <Box
      pt={8}
      pb={6}
      style={{
        background: '#c0c2c4 url("/images/bg1.png") ',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              color="black"
              align="center"
              gutterBottom
              component={'h2'}
              ref={titleRef}
              fontWeight={700}
            >
              Services & Features: What we have to offer
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {mobileDevice ? (
              <Slider {...settings2}>
                {data.map((item, index) => (
                  <Box key={index}>
                    <Paper
                      sx={{
                        m: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        height: expandedIndex === index ? 'auto' : '30rem',
                        p: 2,
                      }}
                    >
                      <Box p={1.5}>{item.icon}</Box>
                      <Typography
                        variant="h5"
                        component={'h1'}
                        // color="white"
                        gutterBottom
                        pt={2}
                        pb={2}
                        fontFamily="Roboto Mono"
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        mt={1.5}
                        fontFamily="Roboto Mono"
                        sx={{
                          lineHeight: 1.7,
                          // color: 'white',
                        }}
                        gutterBottom
                      >
                        {expandedIndex === index
                          ? item.dec
                          : item.dec.slice(0, 120)}
                        {expandedIndex !== index &&
                          item.dec.length > 120 &&
                          '...'}
                      </Typography>
                      <Box mt={5}>
                        <Button
                          color="primary"
                          sx={{ ml: -1, color: '#01ab56' }}
                          onClick={() => handleLearnMoreClick(index)}
                        >
                          Read More
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Slider>
            ) : (
              <Slider {...settings}>
                {data.map((item, index) => (
                  <Box key={index}>
                    <Paper
                      className="slider-div"
                      sx={{
                        m: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        p: 4,
                        pb: expandedIndex === index ? 8 : 4,
                        height: expandedIndex === index ? 'auto' : '30rem',
                        backgroundColor:
                          centerIndex === index
                            ? '#242d38'
                            : 'rgb(255, 255, 255)',
                        transform:
                          centerIndex === index ? 'scale(1.2)' : 'scale(1)',
                        transition:
                          'background-color 0.3s ease-in-out, transform 0.3s ease-in-out, height 0.3s ease-in-out',
                      }}
                    >
                      <Box
                        p={1}
                        sx={{
                          bgcolor:
                            centerIndex === index
                              ? 'rgb(255, 255, 255)'
                              : '#242D38',
                          transition: 'background-color 0.3s ease-in-out',
                        }}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '15px',
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Typography
                        variant="h6"
                        component={'h1'}
                        sx={{
                          color: centerIndex === index ? 'white' : 'black',
                          fontWeight: 600,
                        }}
                        gutterBottom
                        pt={2}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        component={'h2'}
                        sx={{ visibility: 'hidden' }}
                        variant="h6"
                        color="#01ab56"
                        gutterBottom
                      >
                        {item.sub_title}
                      </Typography>
                      <Typography
                        variant="body1"
                        mt={1.5}
                        fontFamily="Roboto Mono"
                        sx={{
                          lineHeight: 1.7,
                          color: centerIndex === index ? 'white' : 'black',
                        }}
                        gutterBottom
                      >
                        {expandedIndex === index
                          ? item.dec
                          : item.dec.slice(0, 120)}
                        {expandedIndex !== index &&
                          item.dec.length > 120 &&
                          '...'}
                      </Typography>
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: '2rem',
                          left: '2rem',
                        }}
                      >
                        <Button
                          color="primary"
                          sx={{ ml: -1, color: '#01ab56' }}
                          onClick={() => handleLearnMoreClick(index)}
                        >
                          {expandedIndex === index ? 'Read Less' : 'Read More'}
                        </Button>
                      </Box>
                    </Paper>
                  </Box>
                ))}
              </Slider>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              component={RouterLink}
              to="/contactUs"
              sx={{
                fontSize: '25px',
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
              Live Chat
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3}>
            <Button
              variant="contained"
              component={RouterLink}
              fullWidth
              size="large"
              to="https://fleetvantage.bondwest.co.uk/authentication/register"
              sx={{
                fontSize: '25px',
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
              Register
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Solution;
