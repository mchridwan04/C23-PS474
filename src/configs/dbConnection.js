var mysql = require('mysql');
var conn = mysql.createConnection({
      host: '34.101.47.38', // Replace with your host name
      user: 'bengkel',      // Replace with your database username
      password: '12345678',      // Replace with your database password
      database: 'capstone2023' // // Replace with your database Name
});

conn.connect(function (err) {
      if (err) throw err;
      console.log('Database is connected successfully !');
});
module.exports = conn;
