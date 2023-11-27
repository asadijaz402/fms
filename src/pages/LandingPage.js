import React, { useRef } from 'react';
// import Feedback from '../Components/landingPage/Feedback';
import { Helmet } from 'react-helmet-async';
import { Footer } from '../Components/landingPage/Footer';
import Header from '../Components/landingPage/Header';
import Pricing from '../Components/landingPage/Pricing';
import Hero from '../Components/landingPage/newhome/Hero';
import { Box } from '@mui/material';
import Solution from '../Components/landingPage/newhome/Solution';
import Contact from '../Components/landingPage/newhome/Contact';
import Steps from '../Components/landingPage/newhome/Step';
import SecondaryContact from '../Components/landingPage/newhome/SecondaryContact';
import HeroContact from '../Components/landingPage/newhome/HeroContact';

const LandingPage = () => {
  const targetRef = useRef(null);
  return (
    <>
      <Helmet>
        <title>
          FleetVantage | Fleet Management Software and Tracking System
        </title>
      </Helmet>
      <Box>
        <Header targetRef={targetRef} />
        {/* <HeroSection /> */}
        <Hero />
        <HeroContact />
        <Solution />
        <Contact />
        <Steps />
        {/* <Solutions /> */}
        {/* <Team /> */}
        <Pricing targetRef={targetRef} />
        <SecondaryContact />
        {/* <Feedback /> */}
        <Footer targetRef={targetRef} />
      </Box>
    </>
  );
};

export default LandingPage;
