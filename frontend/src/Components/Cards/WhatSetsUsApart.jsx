import React from 'react';
import { user_, char, cate } from './imports';
import './WhatSetsUsApart.css';

const WhatSetsUsApart = () => {
  return (
    <div className='feature_section'>
      <h1 className='feature_heading'>Why Plotplus is Your Creative Hub</h1>
      <section className="what-sets-us-apart">
        <div className="feature">
          <img src={user_} className="generate-story" alt="User-Generated Stories" />
          <h2>User-Generated Stories</h2>
          <p>Share your interactive stories anonymously and get feedback from a community of writers. Our platform provides a unique opportunity to showcase your creativity and connect with like-minded individuals.</p>
          <a href="/write" className="feature_links">Upload Your Story</a>
        </div>
        <div className="feature">
          <img src={char} className="feature-char"  alt="Character Creation" />
          <h2>Character Creation</h2>
          <p>Develop complex characters with unique personalities, backstories, and motivations. Our character creation tool allows you to craft characters that will bring your stories to life and engage your readers.</p>
          <a href="/upload" className="feature_links">Make Your Character</a>
        </div>
        <div className="feature">
          <img src={cate} className="feature-genres"  alt="Specialized Genres" />
          <h2>Specialized Genres</h2>
          <p>Discover your perfect read with our tailored genres, curated to cater to diverse tastes and preferences. Whether you're a fan of romance, thriller, or sci-fi, our genres will help you find your next favorite story.</p>
          <a href="#category_" className="feature_links">Explore Your Interest</a>
        </div>
      </section>
    </div>
  );
};

export default WhatSetsUsApart;
