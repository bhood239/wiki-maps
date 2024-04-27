const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/connection');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['0'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.get('/', (req, res) => {
  res.send('Congratulations! GET register');
  if (req.session.user) {
    console.log('Client has a cookie, redirectng to /login');
    res.redirect('../login');
  }
});

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // 1 Redirect to main page if signed in
  if (req.session.user) {
    console.log('Client has a cookie, redirectng to /login');
    res.redirect('../login');
    return;
  }

  // 2 Check if username and password eligible
  if (!username || password === "") {
    res.status(400).send("Username and/or password cannot be empty");
    return;
  }

  return db.query('SELECT * FROM users WHERE username = $1', [username])
    .then(data => {
      if (data.rows.length > 0) { // Username unavailable
        console.log('username in use');
        res.status(405).send("Username already in use");
        return;

      } else { // Username available
        const cookie = uuidv4();
        req.session.user = cookie;
        return db.query(
          `INSERT INTO users (username, password, cookie_id)
                VALUES ($1, $2, $3)`, [username, password, cookie])
          .then(() => {
            res.status(200).send('Success');
          });
      }
    });
});

module.exports = router;
