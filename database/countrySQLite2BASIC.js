const fs = require('fs');
// Conectar ao banco de dados SQLite e executar uma raw query usando sequelize
const sequelize = require('./conexaoSQLite');
const SQL=`
select 
    DISTINCT 
    SUBSTR(C.csPrefixFrom,1,2) AS csPrefixFrom,
    (SELECT AUX.description FROM tb_country AUX WHERE AUX.description = C.country ) as country
from
    tb_callsign_country C;
`
class CountrySQLite2Excel {
  async exportar() {
    // Executar uma raw query
    const countries = await sequelize.query(SQL, {
      type: sequelize.QueryTypes.SELECT
    });

    let iaru_data=[];
    
    // Adicionar os dados na planilha
    countries.forEach(country => {
      const fixedSizecsPrefixFrom = country.csPrefixFrom.padEnd(2);
      const fixedSizeCountry = country.country.padEnd(64);
      const dataChunk=country.csPrefixFrom.substring(0,1);

      if (iaru_data[dataChunk]===undefined){
        iaru_data[dataChunk]='';
      }
      iaru_data[dataChunk] += `${fixedSizecsPrefixFrom}${fixedSizeCountry}\r\n`;
    });

    // Interar as keys do objeto iaru_data
    for (const key in iaru_data) {
        const data=iaru_data[key];

        //Apague o arquivo IARU_XX.DAT se ele existir
        if (fs.existsSync(`IARU_${key}.DAT`)) {
          fs.unlinkSync(`IARU_${key}.DAT`);
        }

        fs.writeFileSync(`IARU_${key}.DAT`, data);
    }
    console.log('Exportação concluída com sucesso!');
  }
}

module.exports = CountrySQLite2Excel;