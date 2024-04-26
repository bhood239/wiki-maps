/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const getPins = require('../db/queries/pins');

router.get('/', async (req, res) => {
  try {
    const pins = await getPins();
    res.json(pins);
  } catch (error) {
    console.error("Error fetching pins:", error);
    res.status(500).send(error.message);
  }
});

module.exports = router;
