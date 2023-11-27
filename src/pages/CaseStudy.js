import React from 'react';
import Banner from '../Components/caseStudy/Banner';
import Insight from '../Components/caseStudy/Insight';
import Opportunity from '../Components/caseStudy/Opportunity';
import Header from '../Components/landingPage/Header';
import { Footer } from '../Components/landingPage/Footer';
import QuickLinks from '../Components/caseStudy/QuickLinks';
function CaseStudy() {
  return (
    <div>
      <Header />
      <Banner />
      <Insight />
      <Opportunity />
      <QuickLinks />
      <Footer />
    </div>
  );
}

export default CaseStudy;
