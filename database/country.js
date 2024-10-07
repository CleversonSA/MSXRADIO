const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./conexaoSQLite');

const Country = sequelize.define('Country', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING(128),
    allowNull: true
  },
  iso3166code: {
    type: DataTypes.STRING(3),
    allowNull: true
  }
}, {
  tableName: 'tb_country',
  // Outras opções do modelo
});

module.exports = Country;