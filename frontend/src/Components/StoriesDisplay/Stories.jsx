import React, { useState, useEffect } from 'react';
import htmlTruncate from 'html-truncate';
import './Stories.css';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { AiFillFilter, AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai'; // Import sorting icons
import Navbar2 from '../Navbar/Navbar2';


function Stories() {
  const [stories, setStories] = useState([]); // Array to hold fetched stories
  const [loading, setLoading] = useState(true); // For showing loading state
  const [error, setError] = useState(null); // For error handling
  const [searchTerm, setSearchTerm] = useState(''); // For search input
  const [selectedCategory, setSelectedCategory] = useState(''); // For selected category
  const [categories, setCategories] = useState([]); // For unique categories

  useEffect(() => {
    // Fetch stories from the backend when component mounts
    fetch('http://localhost:4000/story/getStories')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error: ${res.status} - ${res.statusText}`);
        }
        return res.json(); // Parse JSON response
      })
      .then((data) => {
        setStories(data); // Set fetched stories
        setLoading(false); // Turn off loading

        // Extract unique categories
        const uniqueCategories = [...new Set(data.flatMap(story => story.categories))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error('Error fetching stories:', err);
        setError(err.message); // Set error message
        setLoading(false); // Turn off loading
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Filter stories based on search term and selected category
  const filteredStories = stories.filter(story => {
    const matchesSearchTerm = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? story.categories.includes(selectedCategory) : true;

    return matchesSearchTerm && matchesCategory;
  });

  const handleSort = (order) => {
    const sortedStories = [...stories].sort((a, b) => {
      if (order === 'asc') {
        return a.title.localeCompare(b.title); // Sort by title ascending
      } else {
        return b.title.localeCompare(a.title); // Sort by title descending
      }
    });
    setStories(sortedStories);
  };


  return (
    <div className="stories-page">
      <Navbar2 />
      <div className="stories-background"></div>
      <h1 className="page-title">Read Stories</h1>

      <div className="stories-functionalities">
        <div className="stories-searching">
          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" /> {/* Search icon */}
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />

          </div>
        </div>
        <div className="stories-sorting">
          {/* Category Filter */}
          <div className="category-filter-container">
            <div className="search-container">
              <AiFillFilter className="filter-icon" /> {/* Add the filter icon here */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-filter"
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="stories-asc-des">
          <div className="search-container sort-parent">
            <label className='category-sorting-container'>Sort</label>
            {/* Sorting Icons */}
            <div className="sorting-icons">
              <AiOutlineSortAscending
                className="sort-icon"
                onClick={() => handleSort('asc')}
              />
              <AiOutlineSortDescending
                className="sort-icon"
                onClick={() => handleSort('desc')}
              />
            </div>
          </div>
        </div>
      </div>



      <div className="stories-grid">
        {filteredStories.map((story) => (
          <div key={story._id} className="stories-card">
            <img src={story.coverImage} alt={story.title} className="cover-image" />
            <h2 className="stories-title">{story.title}</h2>
            <p className="stories-author">by {story.author}</p>
            <p className="stories-category">Category: {story.categories.join(', ')}</p>

            <div className="story-content">
              <div dangerouslySetInnerHTML={{ __html: htmlTruncate(story.content, 200) }} />
              {story.content && story.content.length > 200 && (
                <Link to="/story" state={{ story }} className="read-more">
                  Read More
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Stories;
