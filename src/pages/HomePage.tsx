import { useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';

const HomePage = () => {
  // Update page title
  useEffect(() => {
    document.title = 'Horizon Voyages | Journeys Beyond Boundaries';
  }, []);
  
  return (
    <>
      <HeroSection />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
};

export default HomePage;