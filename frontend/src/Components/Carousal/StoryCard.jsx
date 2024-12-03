import React from "react";
import './storyCard.css';
function StoryCard(prop) {
  return (
    <div className="story-card-main">
      <img src={prop.img} alt="" />
      <div className="story-card-title-dis">
        <h2>{prop.title}</h2>
        <p>{prop.dis.substring(0,400) +"..."}</p>
        <button className="custom-btn btn-16">Read More</button>
      </div>
    </div>
  );
}

export default StoryCard;
