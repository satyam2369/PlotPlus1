import React from 'react';
import './Testimonials.css'; 
import user1 from '../../Assets/story.png';
import user2 from '../../Assets/user2.jpg';
import user3 from '../../Assets/story5.jpeg';

const Testimonials = () => {
    const testimonialsData = [
        {
          id: 1,
          name: 'Ava L.',
          title: 'Aspiring Novelist',
          review:
            'PlotPlus gave me the perfect platform to share my stories. The interface is so intuitive, and the community is incredibly supportive. My imagination truly shines here!',
          image: user1, 
        },
        {
          id: 2,
          name: 'Ethan K.',
          title: 'Fantasy Writer',
          review:
            'Posting my epic fantasy stories on PlotPlus has been a dream! The tools for organizing chapters and getting reader feedback are top-notch. It feels like my stories have found their home.',
          image: user2,
        },
        {
          id: 3,
          name: 'Sophia M.',
          title: 'Creative Writer',
          review:
            'PlotPlus allows me to experiment with different genres and formats. I’ve received invaluable feedback from readers, helping me improve my storytelling with every post.',
          image: user3,
        },
      ];

  return (
    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonials-container">
        {testimonialsData.map((testimonial) => (
          <div className="testimonial" key={testimonial.id}>
            <img
              src={testimonial.image}
              alt={`${testimonial.name}'s testimonial`}
              className="testimonial-image"
            />
            <div className="testimonial-content">
              <h3>{testimonial.name}</h3>
              <p className="testimonial-title">{testimonial.title}</p>
              <p className="testimonial-review">"{testimonial.review}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
