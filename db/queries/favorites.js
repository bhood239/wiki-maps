const db = require('../connection');
// CREATE
const createFavorite = (userId, mapId) => {
  return db.query('INSERT INTO favorited_maps (user_id, map_id) VALUES ($1, $2) RETURNING *;', [userId, mapId])
    .then(data => {
      console.log('CREATE: ' + data.rows[0]);
      return;
    });
};

const readFavorites = (userId) => {
  return db.query('SELECT * FROM favorited_maps WHERE user_id = $1;', [userId])
    .then(data => {
      console.log('READ: ' + data.rows);
      return;
    });
};

const checkExistingFavorite = (userId, mapId) => {
  return db.query('SELECT * FROM favorited_maps WHERE user_id = $1 AND map_id = $2;', [userId, mapId])
    .then(data => {
      if (data.rows.length !== 0) {
        console.log('SEARCH: ' + data.rows);
        return true;
      } else {
        return false;
      }
    });
};

const removeFavorite = (userId, mapId) => {
  return db.query('DELETE FROM favorited_maps WHERE user_id = $1 and map_id = $2 RETURNING *;', [userId, mapId])
    .then(data => {
      console.log('DELETE: ' + data.rows);
      return;
    });
};

module.exports = { createFavorite, readFavorites, checkExistingFavorite, removeFavorite };
