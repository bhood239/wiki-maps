const db = require('../connection');

//CRUD for pins

//CREATE
const createPin = (pinData) => {
  // Destructure pinInfo object
  const { lat, lng, map_id, title, description, image } = pinData;

  return db
    .query(
      'INSERT INTO pins (lat, lng, map_id, title, description) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
      [lat, lng, map_id, title, description]
    )
    .then((data) => {
      const pinId = data.rows[0].id; // Extract the newly inserted pin ID

      // Insert image information into the images table
      return db
        .query(
          'INSERT INTO images (pin_id, image_url) VALUES ($1, $2);',
          [pinId, image]
        )
        .then(() => ({ id: pinId })); // Return the pin ID for confirmation or further use
    });
};

//READ ONE MAP'S PINS
const getPinsByMapId = (mapId) => {
  return db.query('SELECT pins.id, pins.lat, pins.lng, pins.title, pins.description, pins.map_id, users.username, images.image_url AS image FROM pins JOIN maps ON map_id = maps.id JOIN images ON pin_id = pins.id JOIN users ON user_id = users.id WHERE map_id = $1;', [mapId]
    )
    .then(data => {
      return data.rows;
    });
};

//READ ALL
const getPins = () => {
  return db.query('SELECT pins.id, pins.lat, pins.lng, pins.title, pins.description, pins.map_id, users.username, images.image_url AS image FROM pins JOIN maps ON map_id = maps.id JOIN images ON pin_id = pins.id JOIN users ON user_id = users.id'
    )
    .then(data => {
      return data.rows;
    });
};

//UPDATE

//DELETE




module.exports = { getPins, getPinsByMapId, createPin };
