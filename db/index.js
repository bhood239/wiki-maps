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

// Populate userData object with existing db
const userData = {};
pool.query('SELECT id, username, password, cookie_id FROM users;')
  .then((result) => {
    console.log(result.rows);
    result.rows.forEach(i => userData[i.username] = i);
  })
  .finally(() => {
    console.log('Current userData:');
    console.log(userData);
  });

module.exports = { pool, query, userData };
