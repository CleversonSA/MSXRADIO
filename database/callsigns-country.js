const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./conexaoSQLite');

const CallsignCountry = sequelize.define('CallsignCountry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  csPrefixFrom: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  csPrefixTo: {
    type: DataTypes.STRING(5),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(128),
    allowNull: true
  }
}, {
  tableName: 'tb_callsign_country',
  // Outras opções do modelo
});

module.exports = CallsignCountry;