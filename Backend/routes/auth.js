// // routes/auth.js
// const express = require('express');
// const passport = require('passport');
// const router = express.Router();

// // Google OAuth routes
// router.get('/google', passport.authenticate('google', {
//     scope: ['profile', 'email'],
//     prompt: 'select_account', // Optional: prompts the user to select an account\
//     redirect_uri: 'http://localhost:3000/auth/google/callback'
// }));

// // router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
// //     console.log('Google authentication successful');
// //     res.redirect('http://localhost:3000/'); // Redirect to home page after successful login
// // });

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
//     console.log('Google authentication successful');

//     // After successful authentication, you can send user data as needed
//     const userData = {
//         id: req.user._id,
//         name: req.user.name,
//         email: req.user.email
//     };

//     // Redirect to front-end with user data if needed
//     res.redirect('http://localhost:3000/?user=' + encodeURIComponent(JSON.stringify(userData)));
// });

// // router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
// //     console.log('Google authentication successful');

// //     if (!req.user) {
// //         console.error('User not found after authentication.');
// //         return res.redirect('/login'); // Redirect to login if user is not found
// //     }

// //     const userData = {
// //         id: req.user._id,
// //         name: req.user.name,
// //         email: req.user.email
// //     };

// //     console.log('Redirecting with user data:', userData);
// //     res.redirect('http://localhost:3000/?user=' + encodeURIComponent(JSON.stringify(userData)));
// // });



// // Facebook OAuth routes
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('/');
// });

// // GitHub OAuth routes
// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect('/');
// });

// module.exports = router;
