const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['0'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.get('/', (req, res) => {
  res.send('Congratulations! GET login');
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT id, cookie_id FROM users WHERE username = $1 AND password = $2', [username, password])
    .then(data => {
      if (data.rows.length > 0) { // Username and password both found
        req.session.user = data.rows[0].cookie_id;
        req.session.userId = data.rows[0].id;
        res.status(200).send('Success');
        console.log('Successful login as ' + username);
        return;
      } else {
        console.log('Invalid username: ' + username + ' and password: ' + password);
        res.status(401).send('Invalid username or password');
        return;
      }
    });
});



module.exports = router;
