const db = require('../connection');

const getMapsList = () => {
  return db.query('SELECT id, lat, lng, name, description FROM maps;'
    )
    .then(data => {
      return data.rows;
    });
};

const getMapById = (id) => {
  return db.query('SELECT lat, lng FROM maps WHERE maps.id = $1', [id])
  .then(data => {
    return data.rows;
  });
};

module.exports = { getMapsList, getMapById };
