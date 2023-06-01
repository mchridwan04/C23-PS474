const Sequelize = require('sequelize');

const sequelize = new Sequelize('capstone2023', 'root', '', {
      host: 'localhost',
      dialect: 'mysql',
});

module.exports = sequelize;
