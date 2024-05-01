const db = require('../connection');

//CRUD queries
//CREATE
const createMap = (userId, name, description, lat, lng) => {
  return db.query('INSERT INTO maps (creator_id, name, description, lat, lng) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [userId, name, description, lat, lng])
    .then(data => {
      return data.rows;
    });
};

//READ ONE
const getMapById = (id) => {
  return db.query('SELECT * FROM maps WHERE maps.id = $1', [id])
    .then(data => {
      return data.rows;
    })
    .catch(() => db.query('SELECT * FROM maps WHERE maps.id = 1')
      .then(data => {
        return data.rows;
      }));
};

//READ ALL
const getMapsList = () => {
  return db.query('SELECT id, lat, lng, name, description, creator_id FROM maps;'
  )
    .then(data => {
      return data.rows;
    });
};

module.exports = { getMapById, getMapsList, createMap };
