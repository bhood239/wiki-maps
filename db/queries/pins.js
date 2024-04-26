const db = require('../connection');

const getPins = () => {
  return db.query('SELECT pins.lat, pins.lng FROM pins JOIN maps ON map_id = maps.id WHERE map_id = 1;'
    )
    .then(data => {
      return data.rows;
    });
};

module.exports = { getPins };
