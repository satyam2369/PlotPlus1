import React from "react";
import './storyCard.css';
import { Link } from 'react-router-dom';

function StoryCard(prop) {
  return (
    <div className="story-card-main">
      <img src={prop.coverImage} alt="" />
      <div className="story-card-title-dis">
        <h2>{prop.title}</h2>
        <p>{prop.content.substring(0, 400) + "..."}</p>
        {/* <button className="custom-btn btn-16">Read More</button> */}
        <Link
          to="/story"
          state={{ story: prop }}
          className="custom-btn btn-16">
          Read More
        </Link>

      </div>
    </div>
  );
}

export default StoryCard;
