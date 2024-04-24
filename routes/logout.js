const express = require('express');
const router = express.Router();
const cookieSession = require('cookie-session');
router.use(cookieSession({
  name: 'session',
  keys: [0],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

router.get('/', (req, res) => {
  req.session.user = "";
  res.redirect('../'); // Send to index if not POST
});

module.exports = router;
