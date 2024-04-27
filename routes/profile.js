const express = require('express');
const router = express.Router();
const database = require("../db/profileData");

// Send profile data
router.get('/', (req, res) => {
  let userId;

  if (req.session && req.session.userId) {
    userId = req.session.userId;
  } else if (req.id) {
    userId = req.id;
  } else {
    return res.status(400).send({ error: "User ID not provided" });
  }

  database
    .getUserDataWithId(userId)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that id" });
      }
      console.log('favmaps', user.favmaps);
      res.send({
        name: user.name,
        image: user.image,
        favMapsCount: user.favmapscount,
        conMapsCount: user.conmapscount,
        favMaps: user.favmaps,
        // conMaps: user.conMaps
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
