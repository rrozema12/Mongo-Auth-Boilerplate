const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const consistentResponseMiddleware = require('./src/middleware/response');
const passport = require('passport');
const keys = require('./config/keys');

require("./src/utils/googleAuthConfig");

const homeRouter = require('./src/routes/home');
const authRouter = require('./src/routes/auth');

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
mongoose.connect(keys.db.local, { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  keys: [keys.cookieKey]
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', consistentResponseMiddleware().middleware);


app.use(passport.initialize());
app.use(passport.session());

app.use('/', homeRouter);
app.use('/auth', authRouter);

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
