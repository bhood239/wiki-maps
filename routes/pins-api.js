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
router.post('/', (req, res) => {
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

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
  if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  console.log(req.body);
  res.json({
    message: 'pin updated'
  })
})

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
