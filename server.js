// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const apiKey = process.env.GOOGLE_MAPS_API;

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: ['0'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));


//require pins and maps from database
const {getPins} = require('./db/queries/pins');

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');

const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const registerRoutes = require('./routes/register');
const pinsApiRoutes = require('./routes/pins-api');
const mapsApiRoutes = require('./routes/maps-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/widgets', widgetApiRoutes);
app.use('/api/pins', pinsApiRoutes);
app.use('/api/maps', mapsApiRoutes);
app.use('/users', usersRoutes);

app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/register', registerRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  console.log(apiKey);
  res.render('index', { apiKey});
});

app.get('/check-login', (req, res) => {
  const userID = req.session['user'];
  console.log('checklogin');
  if (userID) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
