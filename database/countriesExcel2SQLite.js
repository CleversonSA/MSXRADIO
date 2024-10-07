const ExcelJS = require('exceljs');
const sequelize = require('./conexaoSQLite'); // A conexão SQLite
const Country = require('./country'); // O modelo Country atualizado

class countriesExcel2SQLite {
  async exportar() {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile('CountriesExportBkp.xlsx');
    const worksheet = workbook.getWorksheet(1);

    // Primeiro, limpar a tabela tb_country
    await Country.destroy({ where: {}, truncate: true });

    // Lendo e inserindo os dados na tabela
    worksheet.eachRow(async (row, rowNumber) => {
      if (rowNumber !== 1) { // Ignorando o cabeçalho
        const description = row.getCell(2).value;
        const iso3166code = row.getCell(3).value;
        
        // Criando um novo registro no banco de dados para cada linha da planilha
        await Country.create({
          description,
          iso3166code
        });
      }
    });

    console.log('Dados importados com sucesso para SQLite.');
  }
}

module.exports = countriesExcel2SQLite;