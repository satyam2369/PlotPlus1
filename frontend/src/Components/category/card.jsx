import React from 'react'
import hi from './uploads/one.jpg'
import './card.css'

function card(prop) {
  return (
    <div className='card_section'>
            <div className='cat_section'>
                <div className='cat_page'> <img src={`http://localhost:5000/images/`+prop.image} alt="hii"></img> <div />
                    <div className='cat_title'>{prop.title}</div>
                    <div className='cat_des'>{prop.story}</div>
                </div>
            </div>
    </div>
  )
}

export default card