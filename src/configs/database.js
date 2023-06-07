const Sequelize = require('sequelize');

const sequelize = new Sequelize('capstone2023', 'bengkel', '12345678', {
      host: '34.101.47.38',
      dialect: 'mysql',
});

module.exports = sequelize;
