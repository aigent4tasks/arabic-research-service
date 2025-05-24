import React from 'react';
import './HomePage.css';
import Hero from '../../components/home/Hero';
import FeaturedServices from '../../components/home/FeaturedServices';
import AboutSection from '../../components/home/AboutSection';
import TestimonialsSection from '../../components/home/TestimonialsSection';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedServices />
      <AboutSection />
      <TestimonialsSection />
    </div>
  );
}

export default HomePage;
