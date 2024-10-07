const ExcelJS = require('exceljs');
const Country = require('./country'); // Ajuste o caminho conforme necessário

class CountrySQLite2Excel {
  async exportar() {
    // Consultar todos os países
    const countries = await Country.findAll();

    // Criar uma nova planilha
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Countries');

    // Adicionar cabeçalho
    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Description', key: 'description', width: 32 },
      { header: 'Iso3166Code', key: 'iso3166code', width: 10 },
    ];

    // Adicionar os dados na planilha
    countries.forEach(country => {
      sheet.addRow({
        id: country.id,
        description: country.description,
        iso3660code: country.iso3166code
      });
    });

    // Salvar a planilha
    await workbook.xlsx.writeFile('CountriesExport.xlsx');
    console.log('Exportação concluída com sucesso!');
  }
}

module.exports = CountrySQLite2Excel;