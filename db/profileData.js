
const db = require("./connection");



const getUserDataWithId = async function(id) {

  try {
    // USER INFO
    const userInfoPromise = db.query(`
      SELECT username AS name, profile_photo AS image
      FROM users
      WHERE id = $1;`, [id]);

    // FAV MAPS
    const favMapsCountPromise = db.query(`
      SELECT COUNT(DISTINCT map_id) AS favMapsCount
      FROM favorited_maps
      WHERE user_id = $1;`, [id]);

    // CON MAPS
    const conMapsCountPromise = db.query(`
      SELECT COUNT(DISTINCT map_id) AS conMapsCount
      FROM pins
      WHERE user_id = $1;`, [id]);

    // FAV MAPS
    const favMapsPromise = db.query(`
    SELECT ARRAY_AGG(DISTINCT maps.name) AS favMaps
    FROM maps
    JOIN favorited_maps ON maps.id = favorited_maps.map_id
    WHERE favorited_maps.user_id = $1;
    `, [id]);


    //  CON MAPS
    const conMapsPromise = db.query(`
    SELECT ARRAY_AGG(DISTINCT maps.name) AS conMaps
    FROM maps
    JOIN pins ON pins.map_id = maps.id
    WHERE pins.user_id = $1;
    `, [id]);

    const [userInfo, favMapsCount, conMapsCount, favMaps, conMaps] = await Promise.all([userInfoPromise, favMapsCountPromise, conMapsCountPromise, favMapsPromise, conMapsPromise]);

    console.log('favMapsPromise', favMaps.rows[0])
    const result = {
      name: userInfo.rows[0]?.name,
      favMapsCount: favMapsCount.rows[0]?.favmapscount,
      conMapsCount: conMapsCount.rows[0]?.conmapscount,
      favMaps: favMaps.rows[0]?.favmaps,
      conMaps: conMaps.rows[0]?.conmaps
    }

    console.log('RESULTS --> ', result)
    return result
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { getUserDataWithId };
