const express = require('express');
const router  = express.Router();
const mapsQueries = require('../db/queries/maps');
const validCookies = require('../db/validCookies');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['0'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// PINS CRUD REST API

// CREATE - POST /
router.post('/', (req, res) => {
  console.log('reqsessionuser' + req.session.user);
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }


  const userId = req.session.userId;
  const name = req.body.name;
  console.log('name', name);
  const description = req.body.description;
  const lat = req.body.lat;
  const lng = req.body.lng;

  mapsQueries.createMap(userId, name, description, lat, lng);
});

//READ ALL - GET /
router.get('/', async (req, res) => {
  try {
    const mapsList = await mapsQueries.getMapsList();
    res.json(mapsList);
  } catch (error) {
    console.error("Error fetching list of maps:", error);
    res.status(500).send(error.message);
  }
});

//READ ONE - GET /:id
router.get('/:id', async (req, res) => {
  try {
    const map = await mapsQueries.getMapById(req.params.id);
    res.json(map);
  } catch (error) {
    console.error("Error fetching map:", error);
    res.status(500).send(error.message);
  }
});

//UPDATE - POST /:id
router.post('/maps/:id', (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }
  console.log(req.body);
  res.json({
    message: 'map updated'
  })
})

//DELETE - POST /:id/delete
router.post('/maps/:id/delete', (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }
  res.json({
    message: 'map deleted'
  })
})

module.exports = router;
