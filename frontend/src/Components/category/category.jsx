import React, { useEffect, useState } from 'react'
import hi from './uploads/one.jpg'
import two from './uploads/two.jpg'
import three from './uploads/three.jpg'
import four from './uploads/four.jpeg'
import five from './uploads/five.jpg'
import six from './uploads/six.jpg'
import seven from './uploads/seven.jpg'
import './category.css'
import Cards from './card';
import bg from './assets/bg.jpg';
import { Link, useLocation } from 'react-router-dom'
const images =[bg,two,three,four,five,six,seven]

function Category() {
  //   const location = useLocation();
  //   var cat= location.state.cat;
  //   const [Data , setData] = useState([])
  //   console.log("cat "+cat);

  // useEffect(() =>{
  //   fetch("http://localhost:5000/allStory/"+cat).then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setData(data)
  //     }
  //   );
    
  // }, []);
  // console.log(Data);
    return (
      <div > </div>
      //   <div className='container-category'>
      
      //       <img className='bg' src={images[location.state.bg]} alt="background" />
      //       <h1 className='categ_heading'>{location.state.cat}</h1>
            
      //       <div className='category_page'>
      //       {(typeof Data.length ===0) ? (
      //   <p>loding</p>
      // ) :(
      //   Data.map((story,i) =>(
      //     <Link  to="/story" state={{ title:story.title,dis:story.Story }} style={{textDecoration:"none"}}><Cards key={parseInt(i)} inx={i} title={story.title} story={story.Story} image={story.coverPage}/></Link>
      //   ))
      // )}
      //       {/* <Cards />
      //       <Cards />
      //       <Cards />
      //       <Cards />
      //       <Cards />
      //       <Cards />
      //       <Cards /> */}
      //       </div>
      //   </div>
    )
}

export default Category