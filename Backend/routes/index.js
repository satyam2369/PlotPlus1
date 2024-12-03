// var express = require('express');
// var router = express.Router();
// var bodyParser =require('body-parser')
// const cors =require('cors')
// const multer = require('multer')
// const path = require('path');

// // router.use(cors());
// // router.use('/uploads/', express.static(path.join('C:/Users/HP/OneDrive/Desktop/bee_proj/server2/uploads')));
// // const userModel = require("./users");
// const storyModel= require("./story");
// const userModel= require("./users");
// const characterModel = require("./character");
// const { default: mongoose, Collection } = require('mongoose');
// router.use(bodyParser.json())
// // router.use(cors())
// router.use(express.json())


// // mongoose.connect("mongodb://localhost:27017/practicekaro")
// // /* GET home page. */
// // // router.get('/', function(req, res, next) {
// // //   // req.session.ban =true;
// // //   res.cookie("age", 25);
// // //   res.render('index', { title: 'Satyam Mishra' });
// // // });
// // // router.get("/api",(req,res)=>{
// // //   res.json({"users" : ["userOne" , "userTwo" ,"userThree"] })
// // // })


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/images')
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now();
//     cb(null,  uniqueSuffix+ file.originalname)
//   }
// })

// const upload = multer({ storage: storage })


// // router.post('/api/storyUpload',upload.single("image"),  async (req,res,next)=>{
// //   const createdStory = await storyModel.create({
// //     title: req.body.storyTitle,
// //     Story: req.body.storyText,
// //   })
// //   console.log(req.body.coverPage,req.body)
// //   // res.json({"message":"Form Submitted"})
// // })
// router.post('/api/storyUpload', upload.single("coverPage"), async (req, res, next) => {
//   console.log(req.body.identity);
//   try {
//     // Check if req.file is available
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Assuming you want to save the file path in the database
//     const imagePath = req.file.filename;

//     // Create the story in the database
//     const createdStory = await storyModel.create({
//       title: req.body.storyTitle,
//       Story: req.body.storyText,
//       coverPage: imagePath,   // Save the file path in the database
//       category:req.body.category,
//       identity:req.body.identity,
//       Username: req.body.Username

//     });

//     console.log("Story created:", createdStory);
//     res.status(201).json({ message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// // character upload
// router.post('/api/characterUpload', upload.single("Charimage"), async (req, res, next) => {
  
//   try {
//     // Check if req.file is available
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     // Assuming you want to save the file path in the database
//     const imagePath = req.file.filename;

//     // Create the story in the database
//     const createdCharacter = await characterModel.create({
//       CharName:req.body.CharName,
//       CharAge:req.body.CharAge,
//       CharRole:req.body.CharRole,
//       CharLikes:req.body.CharLikes,
//       CharDislike:req.body.CharDislike,
//       CharFamily:req.body.CharFamily,
//       CharDreams:req.body.CharDreams,
//       CharThoughts:req.body.CharThoughts,
//       Charimage:imagePath

//     });

//     console.log("Story created:", createdCharacter);
//     res.status(201).json({ message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });



// router.get("/allStory" , (req,res) =>{
//   // let allStory = await storyModel.find().toArray();
//   storyModel.find()
//   .then(users => res.json(users))
//   .catch(err =>res.json(err))
//   // let alluser = await userModel.findOne({username: "satyam"});
//   // res.json(allStory);
// })
// router.get("/allCharacter" , (req,res) =>{
  
//   characterModel.find()
//   .then(users => res.json(users))
//   .catch(err =>res.json(err))
 
// })
// router.get('/allstory/:category', function (req, res) {
//   // res.send(`hi to ${req.params.category}`);
//   storyModel.find({category :req.params.category})
//   .then(users => res.json(users))
//   .catch(err =>res.json(err))
// })







// // router.get("/read", function(req,res){
// //   console.log(req.cookies.age);
// //   res.send("check console");
// // })

// // router.get("/deletecookie", function(req,res){
// //   res.clearCookie("age");
// //   res.send("deleted");
// // })
// // router.get('/checkban', function(req,res){
// //   if(req.session.ban === true){
// //     res.send("you are banned");
// //   }
// //   else{
// //     res.send("you are not banned");
// //   }
// // })
// // router.get("/removeban", function (req,res){
// //   req.session.destroy(function(err){
// //     if(err) throw err;
// //     res.send("ban removed");
// //   })
// // })

// // router.get('/create',async function(req, res, next) {
// //   // it is a asychronous call the problem with asyc calls are 
// //   // that they go into the side stack thats why it runs in the end when all sync calls finished
// //   // therefore we use await and to use await we have to write async just before the parent function
// //   const createdUser = await userModel.create({
// //     username: "satyam",
// //     age: 20,
// //     name: "harsh"
// //   });

  
// //   res.send(createdUser);

// // });

// //Searching a user

// // router.get("/alluser" ,async function(req,res){
// //   // let alluser = await userModel.find();

// //   let alluser = await userModel.findOne({username: "satyam"});
// //   res.send(alluser);
// // })


// //deleting a user
// // router.get("/delete" ,async function(req,res){
// //   let deleteduser = await userModel.findOneAndDelete({
// //     username: "satyam"
// //   })
// //   res.send(deleteduser);
// // })

// // module.exports = router;


// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'satyam' });
// // });

// router.post('/signUp', async (req, res, next) => {
//   // console.log(req.body.userName);
//   // const createdUser = await userModel.create({
//   //   name : req.body.userName,
//   //   email : req.body.userEmail,
//   //   password : req.body.userPassword
//   //   });
//   //   console.log(createdUser);
//   console.log(req.body.userName)
//     try {
//     // Check if req.file is available
//     // if (!req.file) {
//     //   return res.status(400).json({ message: 'No file uploaded' });
//     // }

//     // Assuming you want to save the file path in the database
//     // const imagePath = "uploads/" + req.file.filename;

//     // Create the story in the database
//     const createdUser = await userModel.create({
//     name : req.body.userName,
//     email : req.body.userEmail,
//     password : req.body.userPassword
//     });
//     console.log("done")

//     console.log("Story created:", createdUser);
//     res.status(201).json({ message: 'Form submitted successfully' });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });
// // router.get("/login" , (req,res) =>{
// //   // let allStory = await storyModel.find().toArray();
// //   userModel.find(req.body.username)
// //   .then(users => {
// //     if(users.password===req.body.password){
// //       res.json("logged");
// //     }
// //   })
// //   .catch(err =>res.json(err))


// //   // let alluser = await userModel.findOne({username: "satyam"});
// //   // res.json(allStory);
// // })
// router.post('/api/login', async (req, res) => {
//   const {Username, Password}=req.body
//   console.log(req.body.Password);
//   try{
//     const check =await userModel.findOne({name:Username, password:Password});
//     if(check){
//       res.json("exist");
//     }
//     else{
//       res.json("notexist");
//     }
//   }
//   catch(e){
//     res.json("not");
//   }
// });



// module.exports = router;
