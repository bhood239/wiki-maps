const express = require('express');
const router  = express.Router();
const pinsQueries = require('../db/queries/pins');

// PINS CRUD REST API

// CREATE - POST /
router.post('/', (req, res) => {
  console.log(req.body);
  res.json({
    message: 'pin created'
  })
})

//READ ALL - GET /
router.get('/', async (req, res) => {
  try {
    const pins = await pinsQueries.getPins(); // change to getPinsByMapId
    res.json(pins);
  } catch (error) {
    console.error("Error fetching pins:", error);
    res.status(500).send(error.message);
  }
});

//READ ONE - GET /:id
router.get('/:id', async (req, res) => {
  try {
    const pin = await getPinById(req.params.id);
    res.json({message: 'pin found', pin});
  } catch (error) {
    console.error("Error fetching pin:", error);
    res.status(500).send(error.message);
  }
});

//UPDATE - POST /:id
router.post('/:id', (req, res) => {
  console.log(req.body);
  res.json({
    message: 'pin updated'
  })
})

//DELETE - POST /:id/delete
router.post('/:id/delete', (req, res) => {
  res.json({
    message: 'pin deleted'
  })
})

module.exports = router;
