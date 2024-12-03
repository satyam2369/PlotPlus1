import React from 'react'
import Hero from '../Components/Hero/Hero'
import './home.css';
import WhatSetsUsApart from '../Components/Cards/WhatSetsUsApart';
import Navbar from '../Components/Navbar/Navbar';
// import Category from '../Components/category/category';
// import Featured from '../Components/Featured_Stories/Featured';
// import PracticeCards from '../Components/PracticeCards';
import Footer from '../Components/Footer/Footer';
import Testimonials from '../Components/Testimonials/Testimonials';
// import BlogResources from '../Components/BlogResources/BlogResources';
import PortfolioShowcase from '../Components/PortfolioShowcase/PortfolioShowcase';
import About from '../Components/About/About';
import { useLocation } from 'react-router-dom'

function Home() {
  const location = useLocation();
  const id = location.state?.id || null;
  return (
    <div className='Home'>
      <div className='hero_background'> </div>
        <Navbar id={id} />
        <Hero />
        <WhatSetsUsApart />
        <PortfolioShowcase />
        <About />
        <Testimonials />
        {/* <PracticeCards /> */}
        {/* <Featured /> */}
        {/* <Category /> */}
        <Footer />
        {/* <BlogResources /> */}
    </div>
  )
}

export default Home