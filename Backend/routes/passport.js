// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const GitHubStrategy = require('passport-github').Strategy;
// const User = require('../model/users'); // Assuming User model is in models/users.js

// // Google OAuth Strategy
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/auth/google/callback"
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });
//     if (!user) {
//       user = await User.create({ 
//         googleId: profile.id, 
//         name: profile.displayName, 
//         email: profile.emails[0].value });
//     }
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// }));

// // Facebook OAuth Strategy
// passport.use(new FacebookStrategy({
//   clientID: process.env.FACEBOOK_CLIENT_ID,
//   clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//   callbackURL: "/auth/facebook/callback",
//   profileFields: ['id', 'displayName', 'emails']
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ facebookId: profile.id });
//     if (!user) {
//       user = await User.create({ facebookId: profile.id, name: profile.displayName, email: profile.emails[0].value });
//     }
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// }));

// // GitHub OAuth Strategy
// passport.use(new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: "/auth/github/callback"
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ githubId: profile.id });
//     if (!user) {
//       user = await User.create({ githubId: profile.id, name: profile.displayName, email: profile.emails[0].value });
//     }
//     done(null, user);
//   } catch (error) {
//     done(error, null);
//   }
// }));

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });
