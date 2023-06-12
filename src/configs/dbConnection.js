var mysql = require('mysql');

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const conn = mysql.createConnection({
      host: `/cloudsql/${process.env.DB_INSTANCE}`,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      socketPath: `/cloudsql/${process.env.DB_INSTANCE}`,
});


conn.connect(function (err) {
      if (err) throw err;
      console.log('Database is connected successfully !');
});
module.exports = conn;
