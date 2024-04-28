const db = require('../connection');

//CRUD for pins

//CREATE
const createPin = (pinInfo, map_id, content) => {
  return db
    .query(
      'INSERT INTO pins (lat, lng, map_id, description) VALUES ($1, $2, $3, $4) RETURNING *;',
      [pinInfo.lat, pinInfo.lng, map_id, content]
    )
    .then((data) => data.rows[0]);
};

//READ ONE MAP'S PINS
const getPinsByMapId = (mapId) => {
  return db.query('SELECT pins.lat, pins.lng, pins.title, pins.description, pins.map_id, users.username, images.image_url AS image FROM pins JOIN maps ON map_id = maps.id JOIN images ON pin_id = pins.id JOIN users ON user_id = users.id WHERE map_id = $1;', [mapId]
    )
    .then(data => {
      return data.rows;
    });
};

//READ ALL
const getPins = () => {
  return db.query('SELECT pins.lat, pins.lng, pins.description AS content FROM pins;'
    )
    .then(data => {
      return data.rows;
    });
};

//UPDATE

//DELETE




module.exports = { getPins, getPinsByMapId, createPin };
