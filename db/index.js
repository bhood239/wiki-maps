const { Pool } = require("pg");

const pool = new Pool({
user: "labber", 
password: "labber",
host: "localhost",
database: "wikimaps"
})

const query = (query, params, callback) => {
  return pool.query(query, params, callback);
}

module.exports = {pool, query};
