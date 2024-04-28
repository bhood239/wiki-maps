
const db = require("./connection");



const getUserDataWithId = function(id) {
  return db.query(`
      SELECT users.username AS name,
      users.profile_photo AS image,
      COUNT(DISTINCT favorited_maps.map_id) AS favMapsCount,
      COUNT(DISTINCT pins.map_id) AS conMapsCount,
      ARRAY_AGG(DISTINCT maps.name) AS favMaps
      FROM users
      LEFT JOIN favorited_maps ON users.id = favorited_maps.user_id
      LEFT JOIN pins ON users.id = pins.user_id
      JOIN maps ON maps.id = favorited_maps.map_id
      WHERE users.id = $1
      GROUP BY users.id;
      `, [id])
    .then((res) => {
      console.log('profileData');
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

module.exports = { getUserDataWithId };
