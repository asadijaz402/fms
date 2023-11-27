import React, { useRef, useEffect } from 'react';
import { Typography, Box, Container, Grid, Hidden } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const options = [
  `Driver’s Details`,
  `Fleet Details`,
  `Customers`,
  `Bookings`,
  `Fleet/Asset Tracking`,
  `Service and Maintenance Reminders`,
  `Dynamic / AI Reporting`,
];
function Step() {
  const stepsRef = useRef(null);
  const optionsRef = useRef([]);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  useEffect(() => {
    const section = stepsRef.current;
    const image = imageRef.current;

    // Using gsap.to() to animate the image up and down
    const animation = gsap.to(image, {
      y: '+=30',
      duration: 2,
      repeat: -1, // Set the repeat option to infinite (-1)
      yoyo: true, // This option reverses the animation to its original state
    });
    // Set up the ScrollTrigger to animate the typography elements
    ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      onEnter: () => {
        const options = optionsRef.current;
        const title = titleRef.current;
        gsap.from(title, {
          duration: 1.5,
          x: -50,
          opacity: 0,
          ease: 'power4.out',
        });
        // Animate each option with its icon, one after another
        gsap.fromTo(
          options[0],
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
        );
        for (let i = 1; i < options.length; i++) {
          gsap.fromTo(
            options[i],
            { opacity: 0, x: -30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: 0.2 * i,
            }
          );
        }
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <Box
      ref={stepsRef}
      pt={10}
      pb={10}
      style={{
        overflow: 'hidden',
        position: 'relative',
        background: '#c0c2c4',
      }}
    >
      <img
        src="/images/bg1.png"
        width="100%"
        height="150%"
        alt="background"
        style={{
          position: 'absolute',
          right: '-50rem',
          top: '-20rem',
          zIndex: '1',
        }}
      />
      <Container style={{ position: 'relative', zIndex: '2' }}>
        <Grid container spacing={1}>
          <Grid item lg={6} md={6}>
            <Typography
              variant="h3"
              sx={{ color: 'black' }}
              mb={5}
              ref={titleRef}
            >
              How it works
            </Typography>

            {options.map((item, index) => {
              return (
                <Box
                  display="flex"
                  gap={2}
                  alignItems="center"
                  m={2}
                  key={item}
                  ref={(el) => (optionsRef.current[index] = el)}
                >
                  <CheckCircleIcon
                    style={{ color: '#01ab56', fontSize: '2rem' }}
                  />
                  <Typography variant="h5" sx={{ color: 'black' }}>
                    {item}
                  </Typography>
                </Box>
              );
            })}
          </Grid>
          <Hidden mdDown>
            <Grid item lg={6} md={6} sx={{ position: 'relative' }}>
              <Box ml={5}>
                <img
                  ref={imageRef}
                  alt="designElement"
                  style={{
                    borderRadius: '10px',
                    position: 'relative',
                    zIndex: '2',
                  }}
                  src="/static/landingPage/Rectangle.jpg"
                  height="100%"
                  width="70%"
                />
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </Box>
  );
}

export default Step;
