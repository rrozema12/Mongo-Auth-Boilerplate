
// 1. Include Packages
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require('morgan');
const authRouter = require('./src/routes/Auth');
const userRouter = require('./src/routes/Users');
const consistentResponseMiddleware = require('./src/middleware/response');

// 2. Include Configuration
const config = require('./config/keys');

// 3. Initialize the application
const app = express();
mongoose.connect(config.db.local, { useNewUrlParser: true });
const corsOptions = {
  origin: [/localhost.*/, /ec2.*/, /amazonaws.*/],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 4. Force https in production
if (app.get('env') === 'production') {
  app.use((req, res, next) => {
    const protocol = req.get('x-forwarded-proto');
    protocol === 'https' ? next() : res.redirect('https://' + req.hostname + req.url);
  });
}

// 5. Connect to MongoDB

// 6. Load app routes
app.use('/api/*', consistentResponseMiddleware().middleware);

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

// 7. Start the server
module.exports = app;