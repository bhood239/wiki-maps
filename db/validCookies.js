const db = require("./connection");

const validCookies = [];

db.query('SELECT cookie_id FROM users')
  .then(data => {
    data.rows.forEach(object => validCookies.push(object.cookie_id));
    console.log(validCookies);
  });

module.exports = validCookies;
