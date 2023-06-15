const Sequelize = require('sequelize');

const sequelize = new Sequelize('replace name database', 'root', '', {
      host: 'localhost',
});

module.exports = sequelize;
