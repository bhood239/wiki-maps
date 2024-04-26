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
    const maps = await mapsQueries.getMapById(1);
    res.json(maps);
  } catch (error) {
    console.error("Error fetching maps:", error);
    res.status(500).send(error.message);
  }
});

//READ ONE - GET /:id
router.get('/:id', async (req, res) => {
  try {
    const map = await getMapById(req.params.id);
    res.json({message: 'map found', map});
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
