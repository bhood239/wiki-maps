const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserWithId = (id) => {
  return db.query('SELECT username FROM users WHERE id = $1;',[id])
    .then(data => {
      return data.rows;
    });
};

module.exports = { getUsers, getUserWithId };
