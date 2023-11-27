import {
  Box,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from '@mui/material';
import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

const Feedback = () => {
  const slide = useRef();
  const reasons = [
    {
      icon: (
        <AccountCircleIcon sx={{ fontSize: '3rem', mb: 3 }} color="primary" />
      ),
      rating: (
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
      ),
      title: 'Briana Patton',
      post: 'Manager',
      text: 'Sed mattis est eget penatibus mauris, sed condimentum vitae viverra. Ipsum ut aliquet et morbi ac in. Lacinia mattis eget nisl pellentesque non, porttitor. Vitae et vestibulum ac id. Dui aliquet porttitor libero consequat volutpat eget sed turpis. Feugiat maecenas commodo et morbi morbi gravida.',
    },
    {
      icon: (
        <AccountCircleIcon sx={{ fontSize: '3rem', mb: 3 }} color="primary" />
      ),
      rating: (
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
      ),
      title: 'Briana Patton',
      post: 'Manager',
      text: 'Sed mattis est eget penatibus mauris, sed condimentum vitae viverra. Ipsum ut aliquet et morbi ac in. Lacinia mattis eget nisl pellentesque non, porttitor. Vitae et vestibulum ac id. Dui aliquet porttitor libero consequat volutpat eget sed turpis. Feugiat maecenas commodo et morbi morbi gravida.',
    },
    {
      icon: (
        <AccountCircleIcon sx={{ fontSize: '3rem', mb: 3 }} color="primary" />
      ),
      rating: (
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
      ),
      title: 'Briana Patton',
      post: 'Manager',
      text: 'Sed mattis est eget penatibus mauris, sed condimentum vitae viverra. Ipsum ut aliquet et morbi ac in. Lacinia mattis eget nisl pellentesque non, porttitor. Vitae et vestibulum ac id. Dui aliquet porttitor libero consequat volutpat eget sed turpis. Feugiat maecenas commodo et morbi morbi gravida.',
    },
    {
      icon: (
        <AccountCircleIcon sx={{ fontSize: '3rem', mb: 3 }} color="primary" />
      ),
      rating: (
        <Rating
          name="half-rating-read"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
      ),
      title: 'Briana Patton',
      post: 'Manager',
      text: 'Sed mattis est eget penatibus mauris, sed condimentum vitae viverra. Ipsum ut aliquet et morbi ac in. Lacinia mattis eget nisl pellentesque non, porttitor. Vitae et vestibulum ac id. Dui aliquet porttitor libero consequat volutpat eget sed turpis. Feugiat maecenas commodo et morbi morbi gravida.',
    },
  ];
  const settings = {
    // centerMode: true,
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
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

  return (
    <Box
      pt={3}
      pb={3}
      style={{
        background: '#c0c2c4',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box>
        <img
          src="/images/bg1.png"
          width="100%"
          height="120%"
          alt=""
          style={{
            position: 'absolute',
            left: '-60rem',
            bottom: '-20rem',
            zIndex: '1',
          }}
        />
      </Box>
      <Box>
        <img
          src="/images/bg1.png"
          width="100%"
          height="150%"
          alt=""
          style={{
            position: 'absolute',
            right: '-60rem',
            top: '-30rem',
            zIndex: '1',
          }}
        />
      </Box>
      <Container
        style={{ position: 'relative', overFlow: 'hidden', zIndex: '2' }}
      >
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Box mt={4} display="flex" sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h2" color="black" gutterBottom>
                FMS is loved by users{' '}
              </Typography>
              <Box style={{ position: 'relative', zIndex: '2' }}>
                <IconButton>
                  {' '}
                  <ArrowCircleLeftOutlinedIcon
                    onClick={() => slide.current.slickPrev()}
                    style={{ fill: 'black' }}
                    sx={{ fontSize: '3rem', mb: 3 }}
                  />
                </IconButton>
                <IconButton>
                  {' '}
                  <ArrowCircleRightOutlinedIcon
                    onClick={() => slide.current.slickNext()}
                    style={{ fill: 'black' }}
                    sx={{ fontSize: '3rem', mb: 3 }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box>
              <Slider ref={slide} {...settings}>
                {reasons.map((item) => {
                  return (
                    <Box>
                      <Paper
                        elevation={3}
                        sx={{
                          backgroundColor: '#ffff',
                          m: 2,
                        }}
                      >
                        <Box
                          p={3}
                          sx={{
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'left',
                            flexDirection: 'column',
                          }}
                        >
                          <Box display="flex" gap={2}>
                            {item.icon}
                            <Box>
                              {' '}
                              <Typography variant={'h5'} color="black">
                                {item.title}
                              </Typography>
                              <Typography
                                variant={'p'}
                                color="#969696"
                                gutterBottom
                              >
                                {item.post}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            variant="p"
                            color="#969696"
                            // gutterBottom
                          >
                            {item.text}
                          </Typography>

                          <Box mt={3}>{item.rating}</Box>
                        </Box>
                      </Paper>
                    </Box>
                  );
                })}
              </Slider>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Feedback;
