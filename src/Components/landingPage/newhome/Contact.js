import React, { useRef, useEffect } from "react";
import { Typography, Box, Container, Grid, Paper, Button } from "@mui/material";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link as RouterLink } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const bodyRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const body = bodyRef.current;
    const buttons = buttonRef.current;
    // Set up the ScrollTrigger to animate the typography elements
    ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      onEnter: () => {
        gsap.from(title, {
          duration: 1.5,
          y: 50,
          opacity: 0,
          ease: "power4.out",
        });
        gsap.from(body, {
          duration: 1.5,
          y: 50,
          opacity: 0,
          delay: 0.5,
          ease: "power4.out",
        });
        gsap.from(buttons, {
          duration: 1.5,
          y: 50,
          opacity: 0,
          delay: 1,
          ease: "power4.out",
        });
      },
    });
  }, []);

  return (
    <Box sx={{ bgcolor: "#242D38" }} pt={5} pb={5} ref={sectionRef}>
      <Container>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item lg={12} sx={{ textAlign: "center" }}>
            <Typography variant="h3" gutterBottom ref={titleRef} color="#fff">
              Get Specifically tailored Fleet Management Software
            </Typography>
            <Typography variant="h5" gutterBottom ref={bodyRef} color="#fff">
              We develop highly customized fleet management software,
              specifically tailored to your business needs.{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} ref={buttonRef} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              component={RouterLink}
              to="/contactUs"
              sx={{
                color: "#ffffff",
                fontSize: "20px",
                backgroundColor: "#01ab56",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: "rgb(0, 119, 60)",
                  boxShadow:
                    "0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)",
                },
              }}
            >
              Talk to Consultant
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              href="tel:+18554440797"
              startIcon={<PhoneAndroidIcon />}
              sx={{
                color: "#ffffff",
                fontSize: "20px",
                backgroundColor: "#01ab56",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: "rgb(0, 119, 60)",
                  boxShadow:
                    "0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)",
                },
              }}
            >
              +1 855 444 0797
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="contained"
              fullWidth
              component={"a"}
              size="large"
              href="https://wa.me/+447729039243"
              startIcon={<WhatsAppIcon />}
              sx={{
                color: "#ffffff",
                fontSize: "20px",
                backgroundColor: "#01ab56",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: "rgb(0, 119, 60)",
                  boxShadow:
                    "0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)",
                },
              }}
            >
              WhatsApp
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={3}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              component={RouterLink}
              to="/contactUs"
              sx={{
                color: "#ffffff",
                fontSize: "20px",
                backgroundColor: "#01ab56",
                "&:hover": {
                  textDecoration: "none",
                  backgroundColor: "rgb(0, 119, 60)",
                  boxShadow:
                    "0 0 1px 0 rgb(0 0 0 / 70%), 0 3px 4px -2px rgb(0 0 0 / 50%)",
                },
              }}
            >
              Request a Quote
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Contact;
