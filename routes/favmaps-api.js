const express = require('express');
const router = express.Router();
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
router.post('/delete', (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  const userId = req.session.userId;
  const mapId = req.body.mapId;

  favoritesQueries.removeFavorite(userId, mapId)
  .then(() => {
    res.status(200).send('Removed Favorite');
  });
});

// CREATE - POST /:id/
router.post('/', (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  const userId = req.session.userId;
  const mapId = req.body.mapId;

  // Check if the combination already exists
  favoritesQueries.checkExistingFavorite(userId, mapId)
    .then((existingFavorite) => {
      if (existingFavorite) {
        res.status(409).send('Favorite already exists');
      } else {
        favoritesQueries.createFavorite(userId, mapId)
          .then(() => {
            res.status(200).send('Favorite created');
          })
          .catch((error) => {
            console.error('Error creating favorite:', error);
            res.status(500).send('Internal server error');
          });
      }
    })
    .catch((error) => {
      console.error('Error checking existing favorite:', error);
      res.status(500).send('Internal server error');
    });
});

//READ ALL - GET /
router.get('/', async (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  try {
    const favList = await favoritesQueries.readFavorites(req.session.userId);
    res.send(favList);
  } catch (error) {
    console.error("Error fetching list of maps:", error);
    res.status(500).send(error.message);
  }
});



module.exports = router;
