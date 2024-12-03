import React from 'react';
import './BlogResources.css'; // Assuming you'll create a separate CSS file for styles

const BlogResources = () => {
  const blogData = [
    {
      id: 1,
      title: 'Top 10 Tips for Crafting Engaging Storylines',
      description: 'Explore tips and tricks to create compelling stories that captivate readers from start to finish.',
      link: '/blog/storylines',
    },
    {
      id: 2,
      title: 'How to Build Realistic Characters for Your Stories',
      description: 'Learn how to create characters that resonate with readers and bring your plot to life.',
      link: '/blog/characters',
    },
    {
      id: 3,
      title: 'The Art of World-Building: Creating Immersive Settings',
      description: 'Dive deep into world-building techniques to make your stories feel alive and immersive.',
      link: '/blog/world-building',
    },
  ];

  return (
    <section className="blog-resources">
      <h2>Latest from Our Blog</h2>
      <div className="blog-container">
        {blogData.map((blog) => (
          <div className="blog-post" key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
            <a href={blog.link} className="read-more">Read More</a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogResources;
