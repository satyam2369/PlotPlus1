import React from 'react';
import { user_, char, cate } from '../Containers/Cards/imports';
import user from '../Assets/750.jpg';
import boy from '../Assets/ch7.jpg';
import genres from '../Assets/genres.jpg';
import './practiceCards.css';

function Card({ imgSrc, title, text, extraTitle, extraText }) {
  return (
    <div className="card-hover">
      <div className="card-hover__content">
        <h3 className="card-hover__title">
          {title}
        </h3>
        <p className="card-hover__text">{text}</p>
        <a href="#" className="card-hover__link">
          <span>Explore Now</span>
          <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>        
        </a>
      </div>
      {/* <div className="card-hover__extra">
        <h4>{extraTitle} <span>now</span> and get <span>{extraText}</span> discount!</h4>
      </div> */}
      <img src={imgSrc} alt="" />
    </div>
  );
}

function PracticeCards() {
  const cards = [
    {
      imgSrc: user,
      title: 'Generate Stories',
      text: 'Share your interactive stories anonymously and get feedback from a community of writers. Our platform provides a unique opportunity to showcase your creativity and connect with like-minded individuals.',
      extraTitle: 'Learn',
      extraText: '40%'
    },
    {
      imgSrc: boy,
      title: 'Create Character',
      text: 'Develop complex characters with unique personalities, backstories, and motivations. Our character creation tool allows you to craft characters that will bring your stories to life and engage your readers.',
      extraTitle: 'Discover',
      extraText: '30%'
    },
    {
      imgSrc: genres,
      title: 'Explore Genres',
      text: "Discover your perfect read with our tailored genres, curated to cater to diverse tastes and preferences. Whether you're a fan of romance, thriller, or sci-fi, our genres will help you find your next favorite story.",
      extraTitle: 'Start',
      extraText: '50%'
    }
  ];

  return (
    <div className='features'>
        <h1 className='features_heading'>What sets us Apart from the Rest</h1>
    <div className="PracticeCards">
      {cards.map((card, index) => (
        <Card
          key={index}
          imgSrc={card.imgSrc}
          title={card.title}
          text={card.text}
          extraTitle={card.extraTitle}
          extraText={card.extraText}
        />
      ))}
    </div>
    </div>
  );
}

export default PracticeCards;
