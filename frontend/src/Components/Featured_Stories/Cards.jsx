import React from 'react';
import "./Cards.css";
import { wisper } from './import.js';
import logo from '../../Assets/logo.png';

function Cards(props) {
  const arr = [wisper, logo];

  return (
    <div className="card">
      <img src={arr[0]} alt="Card visual" className="card-image" />
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p className="card-description">{props.disc}</p>
        <h5 className="card-author">{props.author}</h5>
      </div>
    </div>
  );
}

export default Cards;
