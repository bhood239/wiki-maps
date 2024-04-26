const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
  port: 5432,
});

const query = (query, params, callback) => {
  return pool.query(query, params, callback);
};

const getUserDataWithId = function(id) {
  return pool.query(`
      SELECT users.username AS name,
      users.profile_photo AS image,
      COUNT(favorited_maps.*) AS favMapsCount,
      COUNT(DISTINCT pins.map_id) AS conMapsCount,
      favorited_maps AS favMaps
      FROM users
      LEFT JOIN favorited_maps ON users.id = favorited_maps.user_id
      LEFT JOIN pins ON users.id = pins.user_id
      WHERE users.id = $1
      GROUP BY users.id, favorited_maps.*;
      `, [id])
    .then((res) => {
      const user = res.rows[0];
      if (user) {
        return user;
      }
      return null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { pool, query, getUserDataWithId };
