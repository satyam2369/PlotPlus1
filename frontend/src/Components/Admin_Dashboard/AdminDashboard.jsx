import React, { useState, useEffect } from 'react';
import './AdminDashboard.css'; // Add custom styles for the dashboard and popups
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [popupType, setPopupType] = useState(null);
    const [data, setData] = useState([]);
    const [detailData, setDetailData] = useState(null); // State to hold detail data
    const [searchQuery, setSearchQuery] = useState(''); // Search query
    const [sortOrder, setSortOrder] = useState('asc'); // Sort order
    const [filterCriteria, setFilterCriteria] = useState(''); // Filter criteria


    // Function to fetch data based on the type of popup
    const fetchData = async (type) => {
        try {
            let response;
            if (type === 'stories') {
                response = await fetch('http://localhost:4000/story/getStories');
            } else if (type === 'characters') {
                response = await fetch('http://localhost:4000/character/allCharacter');
            } else if (type === 'users') {
                response = await fetch('http://localhost:4000/users/allUsers');
            }

            if (!response.ok) {
                throw new Error(`Error fetching ${type}`);
            }

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        }
    };

    // Function to handle deletion based on type
    const handleDelete = async (id, type) => {
        try {
            let response;
            if (type === 'stories') {
                response = await fetch(`http://localhost:4000/story/delete/${id}`, { method: 'DELETE' });
            } else if (type === 'characters') {
                response = await fetch(`http://localhost:4000/character/delete/${id}`, { method: 'DELETE' });
            } else if (type === 'users') {
                response = await fetch(`http://localhost:4000/users/delete/${id}`, { method: 'DELETE' });
            }

            if (response.ok) {
                // After deletion, refetch the data to refresh the list
                fetchData(type);
            } else {
                throw new Error('Delete operation failed');
            }
        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
        }
    };

    // Function to fetch detail data based on the type and id
    const fetchDetailData = async (id, type) => {
        try {
            let response;
            if (type === 'stories') {
                response = await fetch(`http://localhost:4000/story/${id}`);
            } else if (type === 'characters') {
                response = await fetch(`http://localhost:4000/character/${id}`);
            } else if (type === 'users') {
                response = await fetch(`http://localhost:4000/users/${id}`);
            }

            if (!response.ok) {
                throw new Error(`Error fetching ${type} details`);
            }

            const result = await response.json();
            setDetailData(result); // Store the detail data in state
        } catch (error) {
            console.error(`Error fetching ${type} details:`, error);
        }
    };


     // Search handler
     const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Sort handler
    const handleSort = () => {
        const sortedData = [...data].sort((a, b) => {
            const compareField = popupType === 'stories' ? 'title' : popupType === 'characters' ? 'name' : 'email';
            if (sortOrder === 'asc') {
                return a[compareField] > b[compareField] ? 1 : -1;
            }
            return a[compareField] < b[compareField] ? 1 : -1;
        });
        setData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order
    };

    // Filter handler (optional for fields like genre, role, etc.)
    const handleFilterChange = (e) => {
        setFilterCriteria(e.target.value);
    };

    const filteredData = data.filter((item) => {
        const searchField = popupType === 'stories' ? item.title : popupType === 'characters' ? item.name : item.email;
        return searchField.toLowerCase().includes(searchQuery.toLowerCase());
    });
    

    // Handle button click to open the popup
    const handlePopupOpen = (type) => {
        setPopupType(type);
        fetchData(type);
    };

    // Handle item click to fetch detail data
    const handleItemClick = (id, type) => {
        fetchDetailData(id, type);
    };

    // Close the popup
    const handlePopupClose = () => {
        setPopupType(null);
        setData([]);
        setDetailData(null); // Reset detail data
    };

    return (
        <div className="admin-dashboard">
            <h1>Admin Dashboard</h1>
            <div className="options">
                <button onClick={() => handlePopupOpen('stories')}>Show All Stories</button>
                <button onClick={() => handlePopupOpen('characters')}>Show All Characters</button>
                <button onClick={() => handlePopupOpen('users')}>Show All Users</button>
            </div>

              {/* Search and sort options */}
              {/* {popupType && (
                
            )} */}

            {/* Popup for listing items */}
            {popupType && (
                <div className="popup-admin">
                    <div className="popup-content-admin">

                        <h2>{popupType.charAt(0).toUpperCase() + popupType.slice(1)}</h2>
                        {/* search and sort  */}
                        <div className="search-sort-filter">
                    <input
                        type="text"
                        placeholder={`Search ${popupType}...`}
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button onClick={handleSort}>Sort {sortOrder === 'asc' ? '▲' : '▼'}</button>

                    {/* Optional filter */}
                    {popupType === 'stories' && (
                        <select value={filterCriteria} onChange={handleFilterChange}>
                            <option value="">All Genres</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Romance">Romance</option>
                            {/* Add more filter options */}
                        </select>
                    )}
                </div>
                        <button className="close-btn" onClick={handlePopupClose}>Close</button>
                        <ul className="popup-list">
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <li key={item._id} onClick={() => handleItemClick(item._id, popupType)}>
                                        {popupType === 'stories' ? item.title : popupType === 'characters' ? item.name : item.email}
                                        <button
                                            className="delete-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(item._id, popupType);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li>No {popupType} found</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}


            {/* Popup for detail data */}
            {detailData && (
                <div className="popup-story-details">
                    <div className="popup-content-story-details">
                        <h2>Detail View</h2>
                        {/* Render the detail data nicely */}
                        {popupType === 'stories' && (
                            <div>
                                <p><strong>Title:</strong> {detailData.title}</p>
                                <p><strong>Author:</strong> {detailData.author}</p>
                                <p><strong>Content:</strong></p>
                                <div
                                    dangerouslySetInnerHTML={{ __html: detailData.content }}
                                />

                                <p><strong>Genre:</strong> {detailData.categories}</p>
                                <p><strong>Created At:</strong> {detailData.createdAt}</p>
                                <p><strong>Cover Image:</strong></p>
                                <img src={detailData.coverImage} alt="Cover Image" className="cover-image" />
                            </div>
                        )}
                        {popupType === 'characters' && (
                            <div>
                                <p><strong>Name:</strong> {detailData.name}</p>
                                <p><strong>Description:</strong> {detailData.description}</p>
                                <p><strong>Genre:</strong> {detailData.genre}</p>
                                <p><strong>Created At:</strong> {detailData.createdAt}</p>
                                <p><strong>Character Image:</strong></p>
                                <img
                                    src={`http://localhost:4000${detailData.charImage}`}
                                    alt="Character Image"
                                    style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
                                />

                                {/* <img src={detailData.charImage} alt="Cover Image" className="char-image" /> */}
                            </div>
                        )}
                        {popupType === 'users' && (
                            <div>
                                <p><strong>Username:</strong> {detailData.name}</p>
                                <p><strong>Email:</strong> {detailData.email}</p>
                                {/* <p><strong>Role:</strong> {detailData.role}</p> */}
                                {/* Add more fields as necessary */}
                            </div>
                        )}
                        <button onClick={() => setDetailData(null)} className="close-btn">Close Detail</button>
                    </div>
                </div>
            )}
        </div>
    );

};

export default AdminDashboard;
