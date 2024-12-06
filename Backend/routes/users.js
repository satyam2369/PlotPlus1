const express = require('express');
const User = require('../model/users');
var router = express.Router();

const bcrypt = require('bcrypt');

const { createToken, getDataFromToken } = require('../services/userService');

const multer = require('multer');
const path = require('path');

// Set storage options for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appends extension
    }
});

const upload = multer({ storage: storage });

router.get('/', function(req, res, next){
  res.json("hello there");
});




// router.post('/signup', async function(req, res,next){
//   // var user = new User(req.body);
//   const createdUser = await User.create(req.body);
//   res.json(createdUser);
// });



// router.post('/login', async function(req, res, next){
//   try {
//     const { email, password } = req.body;
//     const check = await User.findOne({ email: email, password: password });

//     if (check) {
//       const token = createToken({ name: check.name });
//       console.log(token);
//       res.cookie("uid", token, { httpOnly: true, credentials: true }); // Set cookie
//       return res.json(check.name); // Return after setting cookie
//         // Return success response with user's data (without sensitive info)
//         // return res.json({
//         //   success: true,
//         //   message: "Login successful",
//         //   user: { name: user.name, email: user.email } // send only non-sensitive data
//         // });
//     } else {
//       res.json("login failed");
//       // Return failed response
//       // return res.status(401).json({
//       //   success: false,
//       //   message: "Invalid email or password"
//       // });
//     }
//   } catch (error) {
//     next(error);
//   }
// })

// router.post('/login', async function(req, res, next) {
//   try {
//     const { email, password } = req.body;
//     const check = await User.findOne({ email: email, password: password });

//     if (check) {
//       const token = createToken({ name: check.name });
//       res.cookie("uid", token, { httpOnly: true, credentials: true }); // Set cookie
//       return res.json({
//         success: true,
//         message: "Login successful",
//         name: check.name
//       });
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid email or password"
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });

// Signup Route with password hashing
router.post('/signup', upload.single('profilePic'),async function (req, res, next) {
  try {
    const { name, email, password } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    // Hash the password before storing
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user with hashed password
    const createdUser = await User.create({
      name,
      email,
      password: hashedPassword, // Store hashed password
      profilePic,
    });

    res.json({ success: true, user: createdUser });
  } catch (error) {
    next(error);
  }
});

// Login Route with password comparison
router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = createToken({ name: user.name, uid:user._id, email:user.email, profilePic: user.profilePic });
        console.log("token ", token);
        // console.log("token id ", id);
        res.cookie('uid', token, { httpOnly: true, credentials: true });
        return res.json({ success: true, name: user.name });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } else {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    next(error);
  }
});



router.get('/checkLogin', async function(req, res, next){
  const token = req.cookies.uid;
  if(token == null) return res.json(null);

  console.log("hello_token");
  const userData = getDataFromToken(token);
  console.log(userData);
  // console.log(getDataFromToken);
  res.json(userData);
})

router.get('/logout', async function(req, res){
  const token = req.cookies.uid;
    // Clear the cookie by name
    res.clearCookie('uid', {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      path: '/' // Path where the cookie was originally set
    })
    res.json({ success: true });
})

router.post('/checkUsername', async function(req, res){
  const {name} = req.body;
  const check = await User.findOne({name});

  if(check) res.status(400).json({ message: "Username already exist!"});
  else res.json({ message: "Username is available"});
})

router.post('/getUsername', async function(req, res){
  
})

router.post('/checkEmail', async function(req, res, next){
  const {email} = req.body;
  const check = await User.findOne({email});

  if(check) res.status(400).json({ message: "Email already exist!"});
  else res.json({ message: "Email available"});
})

router.get('/allUsers', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;