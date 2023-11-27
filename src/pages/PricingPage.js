import React from 'react';
import { FAQs } from '../Components/FAQs';
import { Footer } from '../Components/landingPage/Footer';
import Header from '../Components/landingPage/Header';
import Pricing from '../Components/landingPage/Pricing';
import LargeFleet from '../Components/PricingPage/LargeFleet';
import Team from '../Components/landingPage/Team';

const PricingPage = () => {
  return (
    <div>
      <Header />
      <Pricing />
      <LargeFleet />
      <FAQs />
      <Team />
      <Footer />
    </div>
  );
};
export default PricingPage;
