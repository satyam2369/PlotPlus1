const express = require('express');
const router = express.Router();
const charModel = require('../model/char');
const multer = require('multer');

// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');  // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

const upload = multer({ storage: storage });

// Character upload route
router.post('/charUpload', upload.single('charImage'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // File path for the uploaded image
    const imagePath = `/images/${req.file.filename}`;

    // Create the character entry in the database
    const createdCharacter = await charModel.create({
      name: req.body.name,
      description: req.body.description,
      genre: req.body.genre,
      charImage: imagePath
    });

    console.log('Character created:', createdCharacter);
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.get("/allCharacter" , (req,res) =>{
  charModel.find()
  .then(character => res.json(character))
  .catch(err =>res.json(err))
 
})

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await charModel.findByIdAndDelete(id);
    res.status(200).json({ message: 'Character deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting character' });
  }
});


// Get character by ID
router.get('/:id', async (req, res) => {
  try {
    const character = await charModel.findById(req.params.id);
    if (!character) {
      return res.status(404).json({ message: 'Character not found' });
    }
    res.json(character);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
