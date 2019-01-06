const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const consistentResponseMiddleware = require('./src/middleware/response');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');

const homeRouter = require('./src/routes/home');
const usersRouter = require('./src/routes/users');

const app = express();

const corsOptions = {
  origin: [/localhost.*/],
  credentials: true,
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Connection URL

// Use connect method to connect to the server
mongoose.connect("mongodb://localhost:27017/testdb", { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', consistentResponseMiddleware().middleware);


app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;