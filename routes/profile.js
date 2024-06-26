const express = require('express');
const router = express.Router();
const database = require("../db/profileData");
const validCookies = require('../db/validCookies');
const cookieSession = require('cookie-session');

router.use(cookieSession({
  name: 'session',
  keys: ['0'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Send profile data
router.get('/', (req, res) => {
  let userId;

  if (req.session && req.session.userId) {
    userId = req.session.userId;
  } else {
    return res.status(400).send({ error: "User ID not provided" });
  }

  database
    .getUserDataWithId(userId)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that id" });
      }
      console.log('userData', user);
      res.send({
        name: user.name,
        image: user.image,
        favMapsCount: user.favMapsCount,
        conMapsCount: user.conMapsCount,
        favMaps: user.favMaps,
        conMaps: user.conMaps
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// load profile with id
router.get('/:id', (req, res) => {
  let userId;
  if (req.params.id) {
    userId = req.params.id;
  } else {
    return res.status(400).send({ error: "User ID not provided" });
  }

  database
    .getUserDataWithId(userId)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that id" });
      }
      console.log('userData', user);
      res.send({
        name: user.name,
        image: user.image,
        favMapsCount: user.favMapsCount,
        conMapsCount: user.conMapsCount,
        favMaps: user.favMaps,
        conMaps: user.conMaps
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Edit profile data
router.post('/', async (req, res) => {
  const userId = req.session.userId;
  const { profile_photo, username, password } = req.body;

  if (!profile_photo || username || password === "") {
    res.status(400).send("Username and/or Password and/or Profile photo cannot be empty");
    return;
  }

  try {
    const result = await database.editProfileOfId(userId, profile_photo, username, password);
    res.send(result);
  } catch (err) {
    console.error('Error editing profile:', err);
    res.status(500).send('Failed to edit profile');
  }
});


module.exports = router;
