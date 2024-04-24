const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "wikimaps",
  port: 5432,
});

const query = (query, params, callback) => {
  return pool.query(query, params, callback);
};

// Populate usernames table with existing usernames
const usernames = [];
pool.query('SELECT username FROM users;')
  .then((result) => (
    result.rows.forEach(i => usernames.push(i.username))))
  .finally((result) => {
    console.log('Current usernames:');
    console.log(usernames);
  });

module.exports = { pool, query, usernames };
