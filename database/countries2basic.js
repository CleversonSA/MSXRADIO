const data = require('./callsigns-country-db.json');
const fs = require('fs');

let str_buffer = '';
let line_number = 20030;
const counter = 0;
for (const value of data) {
  if (counter === 0 || counter % 5 === 0) {
    str_buffer += `\r\n${line_number} DATA "${value.prefixoDe}", "${value.prefixoPara}", "${value.pais}"`;
    line_number += 10;
    counter = 0;
  } else {
    str_buffer += `, "${value.prefixoDe}", "${value.prefixoPara}", "${value.pais}"`;
    counter++;
  }
}
fs.writeFileSync('DATA.BAS', str_buffer);
