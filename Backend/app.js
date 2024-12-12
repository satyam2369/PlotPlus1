var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var StoryRouter = require('./routes/story');
var charRouter = require('./routes/character');
var viewRouter = require('./routes/storyViews');
var adminRouter = require('./routes/admin');
var commentRoutes = require('./routes/comments');

// new code
// const session = require('express-session');
// const passport = require('passport');

require('dotenv').config();
require('./routes/passport'); // Load the Passport config


// var taskRouter = require('./routes/task')
var app = express();
const cors = require("cors");
// Allow all origins
const corsOptions = {
  origin: '*', // Enables all origins
  credentials: true, // Enable sending of cookies
};

app.use(cors(corsOptions));





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// new code
// app.use(session({
//   secret: 'your-session-secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false},
// }));
// app.use(passport.initialize());
// app.use(passport.session());


// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/story', StoryRouter);
app.use('/character', charRouter);
app.use('/views', viewRouter);
app.use('/admin', adminRouter);
app.use('/comments', commentRoutes);


app.use('/uploads', express.static('uploads'));


// new code
// app.use('/auth', require('./routes/auth')); // OAuth routes

// app.use('/task', taskRouter);

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://satyam13omishra:CxHU9WxIbRApFDNS@cluster0.h3grcbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;