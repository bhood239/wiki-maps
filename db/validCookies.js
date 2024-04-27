const db = require("./connection");

const validCookies = [];

db.query('SELECT cookie_id FROM users')
  .then(data => {
    data.rows.forEach(object => validCookies.push(object.cookie_id));
  });


/* Put this code in important routes:

if (!validCookies.includes(req.session.user)) {
    res.status(405).send('Not authorized');
    return;
  }

  */
module.exports = validCookies;
