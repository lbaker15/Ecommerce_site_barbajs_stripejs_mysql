const Sequelize = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', '4rtghlae', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
