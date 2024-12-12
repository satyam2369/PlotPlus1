var express = require('express');
var router = express.Router();
// var bodyParser =require('body-parser')
// const cors =require('cors')
const storyModel = require('../model/story');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;;
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
// const upload = multer({ storage: multer.memoryStorage() })
// Increase the size limit for multer
// const upload = multer({
  // storage: storage,
  // limits: { fileSize: 10 * 1024 * 1024 }  // Limit file size to 10MB
// });

router.post('/uploadStoryImages', upload.single('coverImage'), (req, res) => {
  // try {
    console.log(req.file);
      if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }
      // Construct the image URL based on where the image was saved
      const imageUrl = `https://plotplus1.onrender.com/images/${req.file.filename}`;

      // Send back the image URL to the client
      res.json({ location: imageUrl });
  // } catch (error) {
  //     console.error('Error uploading image:', error);
  //     res.status(500).json({ error: 'Internal server error' });
  // }
});

router.put('/approve/:id', async (req, res) => {
  const story = await Story.findById(req.params.id);
  if (story) {
    story.approved = true;
    await story.save();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Story not found' });
  }
});



// router.post('/uploadStoryImages', upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const uniqueSuffix = Date.now();
//     const filename = `${uniqueSuffix}-${req.file.originalname}`;
    
//     // Save the image to disk
//     const uploadWithSave = multer({ storage: storage }).single('file');
    
//     uploadWithSave(req, async (err) => {
//       if (err) {
//         console.error('Error saving image:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }

//       const imageUrl = `https://plotplus1.onrender.com/images/${filename}`;
      
//       // **Save the image URL in the database** (assuming you have a model for images)
//       const newImage = new ImageModel({ path: imageUrl, filename: req.file.originalname });
//       await newImage.save(); // Save the image information to the DB

//       // Send back the image URL to the client (TinyMCE)
//       res.json({ location: imageUrl });
//     });
//   } catch (error) {
//     console.error('Error during image upload:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


//   router.post('/uploadStoryImages', upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const uniqueSuffix = Date.now();
//     const filename = `${uniqueSuffix}-${req.file.originalname}`;

//     // Use multer.diskStorage to save the image to disk and store the path
//     const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, 'public/images')
//       },
//       filename: function (req, file, cb) {
//         cb(null, filename)
//       }
//     })

//     const uploadWithSave = multer({ storage: storage }).single('file');

//     uploadWithSave(req, (err) => {
//       if (err) {
//         console.error('Error saving image:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//       }

//       const imageUrl = `https://plotplus1.onrender.com/images/${filename}`;
//       res.json({ location: imageUrl });
//     });
//   } catch (error) {
//     console.error('Error during image upload:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.post('/uploadStory', async (req, res) => {
  try {
    const createdStory = await storyModel.create(req.body);
    res.json(createdStory);
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Example route to fetch all stories
router.get('/getStories', async (req, res) => {
  try {
    const stories = await storyModel.find(); // Assuming you're using MongoDB or another DB
    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await storyModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Story deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting story' });
  }
});

router.get('/stories/:id', async (req, res) => {
  try {
    const story = await storyModel.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getstoriesbyuserid/:id', async (req, res) => {
  try {
    const story = await storyModel.find({authorId: req.params.id});
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get story by ID
router.get('/:id', async (req, res) => {
  try {
    const story = await storyModel.findById(req.params.id);
    if (!story) {
      return res.status(404).json({ message: 'Story not found' });
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// router.get('/getStoryById/:id', async (req, res) => {
//   const storyId = req.params.id;
//   try {
//     const story = await storyModel.findById(storyId); // Fetch the story from the database
//     if (!story) return res.status(404).send('Story not found');
//     res.json(story);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// router.get('/getStory/:id', async (req, res) => {
//   try {
//     const story = await storyModel.findById(req.params.id);
//     if (!story) {
//       return res.status(404).json({ message: 'Story not found' });
//     }
//     res.json(story);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching story' });
//   }
// });




module.exports = router;