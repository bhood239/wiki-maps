const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
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

module.exports = router;
