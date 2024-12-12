import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './display.css';



function Display() {
  const [uid, setUid ] = useState();
  const [username, setUserName ] = useState();
  const [comments, setComments] = useState([]); // State for storing comments
  const [isModalOpen, setIsModalOpen] = useState(false); // State for handling comment popup
  const [newComment, setNewComment] = useState(''); // State for the new comment


  useEffect(() => {
    fetch('https://plotplus1.onrender.com/users/checkLogin', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            },
        credentials: 'include',
        // body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data.name);
        if (data != null) {
          setUid(data.uid);
          console.log("username" + data.name);
          setUserName(data.name);
        }})
        
      }, []);
      
      const location = useLocation();
      const story = location.state.story;
      
      // if (!story) {
      //   return <div>Story not found.</div>; // Handle case where story data is not passed
      // }

      
useEffect(() => {
  if (uid && story) {
    // Prepare the POST request to save the story view
    fetch('https://plotplus1.onrender.com/views/saveStoryView', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uid: uid,
        storyid: story._id, // Assuming each story has an _id field
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Story view saved:', data);
      console.log("story id ",story._id);

    })
    .catch(err => {
      console.error('Error saving story view:', err);
    });
  }
}, [uid, story]);
    // console.log(story);

      // Fetch comments for the story
      useEffect(() => {
        if (story) {
          fetch(`https://plotplus1.onrender.com/comments/${story._id}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then(data => setComments(data.comments))
            .catch(err => console.error('Error fetching comments:', err));
        }
      }, [story]);
      
  // Handle new comment submission
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      fetch('https://plotplus1.onrender.com/comments/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          storyid: story._id,
          comment: newComment,
        }),
      })
      .then(response => response.json())
      .then(data => {
        setComments(prevComments => [...prevComments, data.comment]); // Add the new comment to the list
        setNewComment(''); // Clear the input field
        setIsModalOpen(false); // Close the modal
      })
      .catch(err => console.error('Error posting comment:', err));
    }
  };


  return (
   <div className="Display">
    <div className="display-background"></div>
    <div className="story-detail-page">
      <h1 className="story-title">{story.title}</h1>
      <img src={story.coverImage} alt={story.title} className="story-cover-image" />
      <p className="story-author">by {story.author}</p>
     <p className="story-category">
  Category: {story?.categories ? story.categories.join(', ') : 'N/A'}
</p>

      <div className="story-content" dangerouslySetInnerHTML={{ __html: story.content }} />

       {/* Comment Button */}
       <button className="comment-button" onClick={() => setIsModalOpen(true)}>Add Comment</button>

{/* Modal for adding comment */}
{isModalOpen && (
  <div className="comment-modal">
    <div className="modal-content">
      <h2>Add a Comment</h2>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Enter your comment here..."
      />
      <button onClick={handleCommentSubmit} className="comment-button">Post Comment</button>
      <button onClick={() => setIsModalOpen(false)} className="comment-button">Cancel</button>
    </div>
  </div>
)}

{/* Display comments */}
<div className="comments-section">
  <h3>Comments</h3>
  {comments.length === 0 ? (
    <p>No comments yet. Be the first to comment!</p>
  ) : (
    comments.map((comment, index) => (
      <div key={index} className="commentss">
        <div className='comment-author'> 
        <p><strong>{comment.author}</strong>:</p>
        </div>
        <div className='comment-text'> 
        <p>{comment.text}</p>
        </div>
      </div>
    ))
  )}
</div>
    </div>
   </div>
  )
}

export default Display