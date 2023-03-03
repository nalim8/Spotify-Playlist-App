const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const indexRouter = require('./routes');

const CLIENT_URL = process.env.CLIENT_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT || 4500;

module.exports = {
  configure: (app) => {
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: false }));
    app.use(cors({
      origin: `${CLIENT_URL}`,
      credentials: true,
      optionSuccessStatus: 200
    }));
    app.use(flash());
    app.use(session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
      }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(morgan('dev'));
    app.use('/', indexRouter);
  },
  start: (app) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
};