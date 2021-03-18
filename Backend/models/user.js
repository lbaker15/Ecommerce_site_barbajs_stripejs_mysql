const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  address: Sequelize.STRING,
//   orders: {
//       type: Sequelize.INTEGER,
//       get() {
//           return this.getDataValue('orders').split(';')
//       },
//       set(val) {
//         this.setDataValue('orders',val.join(';'));
//      },
//   }
});

module.exports = User;