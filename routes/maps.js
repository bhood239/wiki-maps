const express = require('express');
const router  = express.Router();

router.get('/map', (req, res) => {
  res.render('map', {api_key: process.env.GOOGLE_MAPS_API});
});

module.exports = router;
