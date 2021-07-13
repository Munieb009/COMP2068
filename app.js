var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require ('./routes/about');
var ProjectRouter = require ('./routes/projects');
var courseController = require ('./routes/courses');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about',aboutRouter);
app.use('/Projects',ProjectRouter);
//app.use('/Projects/add',ProjectRouter);
app.use('/courses', courseController);
const mongoose = require('mongoose');
//global config file
const config = require('./config/globals')
mongoose.connect(config.db)
.then(
  (res) =>
  {
    console.log("Connected to the Databases")
  }
).catch(() =>{
  console.log("Connection Failed");
}
)



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
