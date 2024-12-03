import React from 'react'
import './hero.css';
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='Hero'>
      <div className="hero_container">
        <div className='hero_heading'>
          <h2 className='hero_title'>"PlotPlus: Weave Your Destiny, Click by Click, in a Tapestry of Limitless Imagination"</h2>
        </div>
        <div className="hero_subtitle">
          <div style={{ marginTop: "-4vh" }}> </div>
          <p className='p2'>"Compose your story's melody on PlotPlus. Upload now and let your imagination shine!"</p>
        </div>
        <div className="hero_links">
          <Link to='/write' className="feature-link">Write Your Story</Link>
          <Link to='/upload' className="feature-link">Make Your Character</Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
