const express = require('express');
const router  = express.Router();
const mapsQueries = require('../db/queries/maps');
const db = require('../db/connection');

// PINS CRUD REST API

// CREATE - POST /
router.post('/', (req, res) => {
  console.log('userid:' + req.session.userId);
  console.log('cookie:' + req.session.user);
  if (!req.session.user || !req.session.userId) {
    res.status(401).send('Not logged in');
    return;
  }

  const userId = req.session.userId;
  const name = req.body.name;
  const description = req.body.description;
  const lat = req.body.lat;
  const lng = req.body.lng;

  return db.query('INSERT INTO maps (creator_id, name, description, lat, lng) VALUES ($1, $2, $3, $4, $5) RETURNING *', [userId, name, description, lat, lng])
    .then(data => {
      console.log(data.rows[0]);
      res.status(200).send('Success');
      return;
    });
});

// //READ ALL - GET /
// router.get('/', async (req, res) => {
//   try {
//     const maps = await mapsQueries.getMapById(1);
//     res.json(maps);
//   } catch (error) {
//     console.error("Error fetching maps:", error);
//     res.status(500).send(error.message);
//   }
// });

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
router.get('/1', async (req, res) => {
  try {
    const map = await mapsQueries.getMapById(1);
    res.json(map);
  } catch (error) {
    console.error("Error fetching map:", error);
    res.status(500).send(error.message);
  }
});

//UPDATE - POST /:id
router.post('/maps/:id', (req, res) => {
  console.log(req.body);
  res.json({
    message: 'pin updated'
  })
})

//DELETE - POST /:id/delete
router.post('/maps/:id/delete', (req, res) => {
  res.json({
    message: 'pin deleted'
  })
})

module.exports = router;
