import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UserProfile.css'; // Import the CSS file

function UserProfile({ userId }) {
    const location = useLocation();
    const [stories, setStories] = useState([]);
    const [views, setViews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const response = await fetch(`http://localhost:4000/views/getStories/${location.state.uid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch views');
                }
                const viewsData = await response.json();
                setViews(viewsData);
                fetchStoriesDetails(viewsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchStoriesDetails = async (views) => {
            try {
                const storiesPromises = views.map(view => {
                    return fetch(`http://localhost:4000/story/stories/${view.storyid}`).then(res => res.json());
                });
                const storiesData = await Promise.all(storiesPromises);
                setStories(storiesData);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching stories details:", error);
            }
        };

        fetchViews();
    }, [userId]);

    if (loading) {
        return <div className="user-profile-loading">Loading...</div>;
    }

    // if (error) {
    //     return <div className="user-profile-error">Error: {error}</div>;
    // }

    return (
        <div className="user-profile-container">
            <div className="user-profile-header">
                <Link to="/" className="user-profile-back-btn">
                    ← Back
                </Link>
                <h2 className="user-profile-username">{location.state.username}</h2>
            </div>

            <h3 className="user-profile-title">Stories:</h3>

            {stories.length > 0 ? (
                <ul className="user-profile-story-list">
                    {stories.map((story, index) => (
                        <li key={index} className="user-profile-story-card">
                            <h4 className="user-profile-story-title">{story.title}</h4>
                            <p className="user-profile-story-content">{story.content.slice(0, 100)}...</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="user-profile-no-stories">No stories found for this user.</p>
            )}
        </div>
    );
}

export default UserProfile;