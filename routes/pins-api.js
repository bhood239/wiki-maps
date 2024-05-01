const express = require('express');
const router  = express.Router();
const pinsQueries = require('../db/queries/pins');
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
router.post('/', async (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  console.log("Received body:", req.body);
  const { lat, lng, map_id, title, description, image } = req.body;
  if (lat == null || lng == null) { // Checking for null or undefined
    return res.status(400).json({ error: 'Latitude and longitude are required.' });
  }
  try {
    const newPin = await pinsQueries.createPin({ lat, lng, map_id, title, description, image });
    res.status(201).json(newPin); // Send back the created pin as JSON response
  } catch (error) {
    console.error('Error creating pin:', error);
    res.status(500).json({ error: 'Failed to create pin' });
  }
});

//READ ALL - GET /
router.get('/', async (req, res) => {
  try {
    const pins = await pinsQueries.getPins();
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
    res.json({message: 'pins found', pin});
  } catch (error) {
    console.error("Error fetching pins:", error);
    res.status(500).send(error.message);
  }
});

// UPDATE - POST /:id
router.post('/:id', async (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  const pinId = req.params.id;
  const { title, description, image } = req.body;
  console.log(title, description, image);

  try {
    const updatedPin = await pinsQueries.updatePin({ title, description, image }, pinId);
    res.status(200).json(updatedPin); // Send back the updated pin as JSON response
  } catch (error) {
    console.error('Error updating pin:', error);
    res.status(500).json({ error: 'Failed to update pin' });
  }
});

//DELETE - POST /:id/delete
router.post('/:id/delete', (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  res.json({
    message: 'pin deleted'
  })
})

module.exports = router;
