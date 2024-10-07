const { Sequelize } = require('sequelize');

// Configuração da conexão
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './callsigns.sqlite'
});

module.exports = sequelize;