import React from 'react';
import './CharacterCard.css'; // Import the CSS file for styling

function CharacterCard({ charImage, name, description, genre, createdAt }) {
  return (
    <div className="character-card">
      <div className="character-image">
        {/* <img src={image} alt={name} /> */}
        <img src={`https://plotplus1.onrender.com/`+charImage} alt="char_img" />
      </div>
      <div className="character-details">
        <h2 className="character-name">{name}</h2>
        <p className="character-description">
  {description.length > 200 ? description.substring(0, 200) + '...' : description}
</p>
        <p className="character-genre"><strong>Genre:</strong> {genre}</p>
        <p className="character-created"><strong>Created as:</strong> {createdAt}</p>
      </div>
    </div>
  );
}

export default CharacterCard;
