const express = require('express');
const router = express.Router();
const storyViews = require('../model/storyViews'); // Import the storyViews model

// Save a story view
router.post('/saveStoryView', async (req, res) => {
  const { uid, storyid } = req.body;

  try {
    if (!uid || !storyid) {
      return res.status(400).json({ message: 'User ID (uid) and Story ID (storyid) are required' });
    }

    // Check if a view already exists for the given user and story
    const existingView = await storyViews.findOne({ uid, storyid });
    if (existingView) {
      return res.status(200).json({ message: 'Story view already exists', view: existingView });
    }

    // Create a new story view record if it doesn't already exist
    const newView = new storyViews({ uid, storyid });
    await newView.save();

    res.status(201).json({ message: 'Story view recorded successfully', view: newView });
  } catch (error) {
    console.error('Error saving story view:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Get all views for a specific story (by storyid)
// router.get('/getStoriesuwu/:storyid', async (req, res) => {
//   const { storyid } = req.params;

//   try {
//     // Find all views related to the story
//     const views = await storyViews.find({ storyid });

//     if (views.length === 0) {
//       return res.status(404).json({ message: 'No views found for this story' });
//     }

//     res.json(views.length);
//   } catch (error) {
//     console.error('Error fetching story views:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// Get all stories viewed by a specific user (by uid)
router.get('/getStories/:uid', async (req, res) => {
  const { uid } = req.params;

  try {
    // Find all stories viewed by the user
    const views = await storyViews.find({ uid });

    if (views.length === 0) {
      return res.status(404).json({ message: 'No views found for this user' });
    }

    res.json(views);
  } catch (error) {
    console.error('Error fetching user views:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;