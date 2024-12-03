import React from 'react';
import './PortfolioShowcase.css'; 
import Carousal from './Carousal';

const PortfolioShowcase = () => {

  return (
    <section className="portfolio-showcase">
      <h2>Featured Stories</h2>
      <Carousal />
    </section>
  );
};

export default PortfolioShowcase;
