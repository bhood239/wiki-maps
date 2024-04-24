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
  }

  // 2 Check if username and password eligible
  if (!username || password === "") {
    res.status(400).send("Username and/or password cannot be empty");
    return;
  }

  if (db.usernames.includes(username)) {
    res.status(405).send("Username already in use");
    return;
  }

  // 3 Sign in user
  const cookie = uuidv4();
  res.session.user = cookie;
  res.redirect('/users/username');

  // 4 Generate user in db (Must be last because async)
  return db.query(
    `INSERT INTO users (username, password, cookie_id)
      VALUES ($1, $2, $3)
      RETURNING *`, [username, password, cookie])
    .then((result) => {
      db.usernames.push(result.rows[0].username);
      console.log('returning result:' + JSON.stringify(result.rows));
      return result.rows;
    });
});


module.exports = router;
