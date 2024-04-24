const express = require('express');
const router = express.Router();
const db = require('../db/index');
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: [0],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.get('/', (req, res) => {
  res.send('Congratulations! GET login');
});

router.post('/', (req, res) => {
  const {username, password} = req.body;
  const storedUser = db.userData[username];

  if (storedUser && (storedUser.password = password)) {
    // Set user cookie
    req.session.user = storedUser.cookie_id;
    console.log('login success for ' + username);
    res.redirect('../'); // Change to map screen later
  } else {
    res.status(401).send('Invalid username or password given');
  }
});

module.exports = router;
