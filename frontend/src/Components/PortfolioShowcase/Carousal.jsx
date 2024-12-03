import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import StoryCard from './StoryCard';
import image from '../../Assets/light_house.jpg';
import image1 from '../../Assets/forest1.jpg';



const Carousal = () => {
  const settings = {
    dots: true, 
    infinite: true, 
    speed: 500, 
    slidesToShow: 1, 
    slidesToScroll: 1, 
    autoplay: true, 
    autoplaySpeed: 3000, 
    arrows: true, 
  };

  const stories = [
    {
        img : image1,
        title:"The Song of the Forgotten Forest",
        dis:"In a land where the sun never fully set, nestled between towering mountains, there was a forest forgotten by time. The trees stood tall and ancient, their gnarled branches whispering secrets to the wind. Legends told of a time when the forest sang with life, a melody so enchanting that it could charm even the hardest of hearts. But now, the forest was silent, its song lost to the ages. Amara, a young girl with a heart as wild as the forest itself, had heard the stories from her grandmother. The old woman spoke of the forest’s song with a wistful smile, her eyes glazing over as if she could hear it still. One day, Amara promised herself, I will find the song and bring it back. Armed with nothing but a worn-out map and her determination, Amara ventured into the forest. The deeper she went, the thicker the silence became. It was as if the trees themselves were holding their breath, waiting for something—or someone. Days turned into weeks, and Amara wandered through the dense woods, following the faintest of trails that led her deeper into the heart of the forest. She met creatures of all kinds—foxes with golden eyes, deer that moved like shadows, and birds that circled above but never sang. They watched her with curiosity, as if recognizing the purpose that drove her. One evening, as twilight painted the sky in hues of lavender and gold, Amara stumbled upon a clearing. In its center stood a tree unlike any she had seen before. It was tall and graceful, its bark shimmering with a soft, ethereal glow. Its leaves were silver, and when they rustled in the breeze, they produced a faint, haunting melody. Amara approached the tree with reverence. She placed her hand on its trunk, and in that moment, she felt a warmth spread through her, as if the tree were greeting an old friend. The melody grew stronger, and Amara realized that this was the heart of the forest—the source of the song. But the song was incomplete. It was beautiful, but it was missing something, a note that would make it whole. Amara closed her eyes and listened, allowing the music to fill her senses. And then she understood. The song was not meant to be heard by the ears, but by the heart. It was a song of memories, of love and loss, of life and death. It was the song of the forest itself, a song that had been forgotten because there were none left who could hear it. With a deep breath, Amara began to hum. The notes came to her as if they had been buried deep within her soul, waiting for this moment. The melody grew, weaving through the trees, calling out to every living creature. The foxes stopped in their tracks, the deer raised their heads, and the birds took flight, filling the sky with color. And then, the forest responded. The trees began to sway, their leaves rustling in harmony with Amara’s voice. The ground beneath her feet vibrated with the rhythm, and the wind carried the song far and wide. The forgotten melody filled the air, rich and full, resonating with the life that had always been there, hidden beneath the silence. As the final note faded into the night, Amara opened her eyes. The forest was alive with sound, its song restored. The creatures returned to their homes, the trees stood tall and proud, and the birds finally sang. Amara knew she had to leave, but as she walked away, she felt a part of her would always remain in the forest, where the song would live on. The forest had not forgotten its song—it had simply been waiting for someone who could listen with their heart. And now, it would never be silent again."

    },
    {
        img : image,
        title:"The Lighthouse Keeper's Secret",
        dis:"On a rugged cliff overlooking the endless expanse of the sea stood an old lighthouse. Its weathered stones had withstood countless storms, guiding sailors safely to shore with its unwavering beam. The townspeople spoke of it with a mix of reverence and mystery, for no one had ever seen the lighthouse keeper who maintained it."

    },
  ];

  return (
    <div style={{ width: '80%', margin: 'auto' }}>
      <Slider {...settings}>
        {stories.map((story, index) => (
          <StoryCard key={index} img ={story.img} title={story.title} dis={story.dis}/>
        ))}
      </Slider>
    </div>
  );
};

export default Carousal;
