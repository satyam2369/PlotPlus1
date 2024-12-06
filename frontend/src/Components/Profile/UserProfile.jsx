import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './UserProfile.css'; // Import the CSS file

function UserProfile({ userId }) {
    const location = useLocation();
    const [stories, setStories] = useState([]);
    const [views, setViews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [activeTab, setActiveTab] = useState('storiesViewed');
    const [storiesViewed, setStoriesViewed] = useState([]);
    const [yourStories, setYourStories] = useState([]);
    const [charactersViewed, setCharactersViewed] = useState([]);

    useEffect(() => {
        const fetchViews = async () => {
            try {
                const response = await fetch(`http://localhost:4000/views/getStories/${location.state.uid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch views');
                }
                const viewsData = await response.json();
                console.log("Views data:", viewsData);
                setViews(viewsData);
                fetchStoriesDetails(viewsData);

                // Fetch Your Stories
                // const yourStoriesResponse = await fetch(`http://localhost:4000/views/getStories/${location.state.uid}`);
                // if (!yourStoriesResponse.ok) throw new Error('Failed to fetch your stories');
                // const yourStoriesData = await yourStoriesResponse.json();
                // console.log("your stories data:", yourStoriesData);
                // setYourStories(yourStoriesData);

                // Fetch Characters Viewed
                // const charactersResponse = await fetch(`http://localhost:4000/views/getCharacters/${location.state.uid}`);
                // if (!charactersResponse.ok) throw new Error('Failed to fetch characters viewed');
                // const charactersData = await charactersResponse.json();
                // console.log("characters data:", charactersData);
                // setCharactersViewed(charactersData);
                
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

    const renderStories = (storiesToRender) => {
        return storiesToRender.length > 0 ? (
            <ul className="user-profile-story-list">
                {storiesToRender.map((story, index) => (
                    <li key={index} className="user-profile-story-card">
                        <Link to="/story" state={{ story }}>
                            <h4 className="user-profile-story-title">{story.title}</h4>
                            <p className="user-profile-story-content">
                                {story.content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100)}...
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="user-profile-no-stories">No stories found.</p>
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'storiesViewed':
                return renderStories(stories);
            case 'yourStories':
                return renderStories(yourStories);
            case 'charactersViewed':
                return charactersViewed.length > 0 ? (
                    <ul className="user-profile-story-list">
                        {charactersViewed.map((character, index) => (
                            <li key={index} className="user-profile-story-card">
                                <h4 className="user-profile-story-title">{character.name}</h4>
                                <p className="user-profile-story-content">{character.description.slice(0, 100)}...</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="user-profile-no-stories">No characters viewed.</p>
                );
            default:
                return null;
        }
    };

    return (
        <div className="user-profile-container">
            <div className="user-profile-header">
                <Link to="/" className="user-profile-back-btn">
                    ← Back
                </Link>
                <h2 className="user-profile-username">{location.state.username}</h2>
            </div>

            {/* <h3 className="user-profile-title">Stories:</h3> */}

            <div className="user-profile-tabs">
                <button
                    className={`user-profile-tab ${activeTab === 'storiesViewed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('storiesViewed')}
                >
                    Stories Viewed
                </button>
                <button
                    className={`user-profile-tab ${activeTab === 'yourStories' ? 'active' : ''}`}
                    onClick={() => setActiveTab('yourStories')}
                >
                    Your Stories
                </button>
                <button
                    className={`user-profile-tab ${activeTab === 'charactersViewed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('charactersViewed')}
                >
                    Characters Viewed
                </button>
            </div>

            <div className="user-profile-content">{renderContent()}</div>


            {/* {stories.length > 0 ? (
  <ul className="user-profile-story-list">
    {stories.map((story, index) => (
      <li key={index} className="user-profile-story-card">
        <Link to="/story" state={{ story }}>
          <h4 className="user-profile-story-title">{story.title}</h4>
          <p className="user-profile-story-content">
            {story.content.replace(/<\/?[^>]+(>|$)/g, '').slice(0, 100)}...
          </p>
        </Link>
      </li>
    ))}
  </ul>
) : (
  <p className="user-profile-no-stories">No stories found for this user.</p>
)} */}

            {/* {stories.length > 0 ? (
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
            )} */}
        </div>
    );
}

export default UserProfile;


// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import './UserProfile.css'; // Import the CSS file

// function UserProfile({ userId }) {
//     const location = useLocation();
//     const [stories, setStories] = useState([]);
//     const [views, setViews] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchViews = async () => {
//             try {
//                 const response = await fetch(http://localhost:4000/views/getStories/${location.state.uid});
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch views');
//                 }
//                 const viewsData = await response.json();
//                 setViews(viewsData);
//                 fetchStoriesDetails(viewsData);
//             } catch (error) {
//                 setError(error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchStoriesDetails = async (views) => {
//             try {
//                 const storiesPromises = views.map(view => {
//                     return fetch(http://localhost:4000/story/stories/${view.storyid}).then(res => res.json());
//                 });
//                 const storiesData = await Promise.all(storiesPromises);
//                 setStories(storiesData);
//             } catch (error) {
//                 setError(error.message);
//                 console.error("Error fetching stories details:", error);
//             }
//         };

//         fetchViews();
//     }, [userId]);

//     if (loading) {
//         return <div className="user-profile-loading">Loading...</div>;
//     }

//     // if (error) {
//     //     return <div className="user-profile-error">Error: {error}</div>;
//     // }

//     return (
//         <div className="user-profile-container">
//             <div className="user-profile-header">
//                 <Link to="/" className="user-profile-back-btn">
//                     ← Back
//                 </Link>
//                 <h2 className="user-profile-username">{location.state.username}</h2>
//             </div>

//             <h3 className="user-profile-title">Stories:</h3>

//             {stories.length > 0 ? (
//                 <ul className="user-profile-story-list">
//                     {stories.map((story, index) => (
//                         <li key={index} className="user-profile-story-card">
//                             <h4 className="user-profile-story-title">{story.title}</h4>
//                             <p className="user-profile-story-content">{story.content.slice(0, 100)}...</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p className="user-profile-no-stories">No stories found for this user.</p>
//             )}
//         </div>
//     );
// }

// export default UserProfile;