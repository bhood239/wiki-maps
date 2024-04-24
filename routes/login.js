const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/index');

router.get('/', (req, res) => {
  res.send('Congratulations! GET login');
});

router.post('/', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const cookie = uuidv4();

  return db.query(
    `INSERT INTO users (username, password, cookie_id)
    VALUES ($1, $2, $3)
    RETURNING *`, [username, password, cookie_id])
    .then((result) => {
      console.log('returning result:' + JSON.stringify(result.rows));
      return result.rows;
    });

});

module.exports = router;
