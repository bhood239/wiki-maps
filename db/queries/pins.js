const db = require('../connection');

const getPins = (mapId) => {
  return db.query('SELECT pins.lat, pins.lng, pins.description AS content FROM pins JOIN maps ON map_id = maps.id WHERE map_id = $1;', [mapId]
    )
    .then(data => {
      return data.rows;
    });
};

const getPinsById = (mapId) => {
  return db.query('SELECT pins.lat, pins.lng, pins.description AS content FROM pins JOIN maps ON map_id = maps.id WHERE map_id = $1;', [mapId]
    )
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPins, getPinsById };
