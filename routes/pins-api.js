const express = require('express');
const router  = express.Router();
const pinsQueries = require('../db/queries/pins');

// PINS CRUD REST API

// CREATE - POST /
router.post('/', (req, res) => {
  const { lat, lng } = req.body; // Extract lat and lng from request body
  try {
    // Use createPin function to insert pin into the database
    const newPin = pinsQueries.createPin({ lat, lng }, 1);
    res.status(201).json(newPin); // Send back the created pin as JSON response
  } catch (error) {
    console.error('Error creating pin:', error);
    res.status(500).json({ error: 'Failed to create pin' });
  }
});

//READ ALL - GET /
router.get('/', async (req, res) => {
  try {
    const pins = await pinsQueries.getPinsByMapId(1);
    res.json(pins);
  } catch (error) {
    console.error("Error fetching pins:", error);
    res.status(500).send(error.message);
  }
});

//READ FOR ONE MAP - GET /:id
router.get('/:id', async (req, res) => {
  try {
    const pin = await pinsQueries.getPinsByMapId(req.params.id);
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
