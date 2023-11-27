import { Helmet } from 'react-helmet-async';
import { Footer } from '../Components/landingPage/Footer';
import Header from '../Components/landingPage/Header';
import Pricing from '../Components/landingPage/Pricing';
import Team from '../Components/landingPage/Team';
import HeroSection from '../Components/TrackerLandingPage/HeroSection';
import Solutions from '../Components/TrackerLandingPage/Solutions';

export default function TrackerLandingPage() {
  return (
    <>
      <Helmet>
        <title>Vehicle Tracking System</title>
        <meta
          title="keywords"
          content="vehicle tracking, asset tracking, fleet management, fleet tracking"
        />
        <meta
          name="description"
          content="Efficiently manage your fleet with our innovative fleet tracking and management web app. Our software provides real-time GPS tracking, fleet performance monitoring, and customizable reports to help you optimize your operations and reduce costs. Stay on top of your fleet's location, maintenance, and fuel usage with our user-friendly platform. Try our fleet management app today and streamline your business operations."
        />
      </Helmet>
      <Header />
      <HeroSection />
      <Solutions />
      <Team />
      <Pricing />
      <Footer />
    </>
  );
}
