const express = require('express');
const router  = express.Router();
const favoritesQueries = require('../db/queries/favorites');
const validCookies = require('../db/validCookies');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['0'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// FAVMAPS CRUD REST API

//DELETE - POST /:id/delete
router.post('/:id/delete', (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  const userId = req.session.userId;
  const mapId = req.params.id;

  favoritesQueries.removeFavorite(userId, mapId);
});

// CREATE - POST /:id/
router.post('/:id', (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  const userId = req.session.userId;
  const mapId = req.params.id;

  favoritesQueries.createFavorite(userId, mapId);
});

//READ ALL - GET /
router.get('/', async (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  try {
    const favList = await favoritesQueries.readFavorites(req.session.userId);
    res.json(favList);
  } catch (error) {
    console.error("Error fetching list of maps:", error);
    res.status(500).send(error.message);
  }
});



module.exports = router;
