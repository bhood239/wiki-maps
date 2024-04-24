const express = require('express');
const router  = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db/index');

router.get('/', (req, res) => {
  res.send('Congratulations! GET register');
});

router.post('/', (req, res) => {
  console.log(req.body);
  const {username, password} = req.body;

});

module.exports = router;
