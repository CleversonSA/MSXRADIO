const XLSX = require('xlsx');
const _ = require('lodash');
const fs = require('fs');
const sequelize = require('./conexaoSQLite');
const CallsignCountry = require('./callsigns-country');
const Country = require('./country'); // Importar a model Country
const CountrySQLite2Excel = require('./countrySQLite2Excel'); // Importar a classe CountrySQLite2Excel
const countriesExcel2SQLite = require('./countriesExcel2SQLite'); // Importar a classe countriesExcel2SQLite
const CountrySQLite2BASIC = require('./countrySQLite2BASIC'); // Importar a classe CountrySQLite2BASIC

// Ler o arquivo
const workbook = XLSX.readFile('CallSignSeriesRanges.xlsx');

// Pegar a primeira planilha
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Converter a planilha para JSON
const data = XLSX.utils.sheet_to_json(worksheet, {header:1});

// Remover o cabeçalho
data.shift();

// Mapear os dados para o formato desejado
const result = data.map(row => {
  const [prefixoDe, prefixoPara] = _.split(row[0], '-', 2);
  return {
    prefixoDe: prefixoDe.trim(),
    prefixoPara: prefixoPara ? prefixoPara.trim() : null,
    pais: row[1]
  };
});

// Escrever o resultado em um arquivo JSON
fs.writeFileSync('callsigns-country-db.json', JSON.stringify(result, null, 2));

// Gerar um array de países únicos
const countries = _.uniq(data.map(row => row[1])).map(pais => ({ pais }));

// Gerar um array de países únicos
const uniqueCountries = _.uniqBy(result, 'pais').map(item => ({
  description: item.pais
}));

// Escrever o array de países em um arquivo JSON
fs.writeFileSync('countries.json', JSON.stringify(countries, null, 2));

// Mapear os dados para o formato do modelo
const dbData = result.map(item => ({
  csPrefixFrom: item.prefixoDe,
  csPrefixTo: item.prefixoPara,
  country: item.pais
}));

// Antes de iniciar a inserção, assegure-se de que a função é assíncrona
sequelize.sync({ force: false }).then(async () => {

  /*await CallsignCountry.bulkCreate(result.map(item => ({
    csPrefixFrom: item.prefixoDe,
    csPrefixTo: item.prefixoPara,
    country: item.pais
  })));
*/

  // Inserir países na tabela tb_country sequencialmente
/*  for await (const country of uniqueCountries) {
    await Country.findOrCreate({
      where: { description: country.description }
    });
  }
*/

  // Exportar os dados para um arquivo Excel
  //const countrySQLite2Excel = new CountrySQLite2Excel();
  //await countrySQLite2Excel.exportar();\
  //const CountriesExcel2SQLite = new countriesExcel2SQLite();
  //await CountriesExcel2SQLite.exportar();

  const countrySQLite2BASIC = new CountrySQLite2BASIC();
  await countrySQLite2BASIC.exportar();
});

