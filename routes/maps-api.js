const express = require('express');
const router  = express.Router();
const mapsQueries = require('../db/queries/maps');

// PINS CRUD REST API

// CREATE - POST /
router.post('/', (req, res) => {
  console.log(req.body);
  res.json({
    message: 'map created'
  })
})

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
