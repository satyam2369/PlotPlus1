const express = require('express');
const router = express.Router();
const Comment = require('../model/Comment');
// const User = require('../models/user'); 
// const Story = require('../models/story'); 


// // Route to fetch comments for a specific story
router.get('/:storyId', async (req, res) => {
  try {
    const comments = await Comment.find({ storyId: req.params.storyId })
    res.json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
});

// // Route to add a comment
// router.post('/add', async (req, res) => {
//   const { uid, storyid, comment } = req.body;

//   try {
//     // Find the user by uid
//     const user = await User.findById(uid);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Find the story by storyid
//     const story = await Story.findById(storyid);
//     if (!story) {
//       return res.status(404).json({ message: 'Story not found' });
//     }

//     // Create a new comment
//     const newComment = new Comment({
//       storyId: storyid,
//       uid: uid,
//       author: user.username, // Assuming user model has 'username' field
//       text: comment,
//     });

//     // Save the comment to the database
//     const savedComment = await newComment.save();
//     res.json({ message: 'Comment added', comment: savedComment });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding comment', error });
//   }
// });


// GET comments for a specific story
// router.get('/:storyId', async (req, res) => {
//     try {
//       const comments = await Comment.find({ storyId: req.params.storyId }).populate('author', 'name').sort({ createdAt: 1 });
//       res.json({ comments });
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching comments', error });
//     }
//   });
  
  // POST a new comment
  router.post('/add', async (req, res) => {
    const { username, storyid, comment } = req.body;
    // try {
    console.log(req.body);
      const newComment = new Comment({
        storyId: storyid,
        author: username,
        text: comment,
      });
      await newComment.save();
      res.json({ comment: newComment });
    // } catch (error) {
    //   res.status(500).json({ message: 'Error posting comment', error });
    // }
  });
  
module.exports = router;
