# UTILITÁRIOS DE RADIO AMADORISMO PARA MSX

Somente um "just for fun" de utilitários para radio amadorismo que criei utilizando a linguagem MSX BASIC.
Todos os programas foram criados utilizando meu uMSX portátil (MSX2+ por FPGA) e são compatíveis com 40 
colunas e MSX 1.

No entanto, alguns utilitários, em especial o de consulta de indicativo, utilizam banco de dados por arquivo,
então um Disk BASIC se faz necessário, seja usando em disquete físico ou SD Mapper.

Também o código está aberto para referências caso algum MSXzeiro queria mexer ou experimentar.

# UTILITÁRIOS DISPONÍVEIS

* Calcular distância entre dois Grid Squares

Esse programa calcula a distância entre dois grid square locators utilizando a fórmula de Haversine, mostrando em KMs. Essa calculadora tem disponível no site da IARU ou aplicativos como o WSJT-X. Somente portei a lógica para o MSX (com ajudinha do ChatGPT 4 :)).

Além de calcular a distância em quilômetros, retorna a latitude e longitude, em graus, de cada Grid Square, facilitando a busca no Google Maps, por exemplo.

Experimente com o meu grid square locator aqui do Brasil (GG46qt) e um de outro país como o (IO93ob), ira retornar +- 9742.5KM.

AVISO: Em calculadoras online a distância comparada com o programa pode ter uma pequena taxa de variação para menos ou mais, pois a própria formula de haversine tem uma margem de erro aplicada ao raio da Terra. Essa taxa de variação ocorre também devido a forma como os micros 8 bits trabalham com números de ponto flutuante.

* País do indicativo

Localiza o país conforme o indicativo do Radiamador informado. Usa como base de dados a listagem disponível no site da IARU, por isso está pendente a tradução da base. Experimente digitar o meu indicativo: PU5TOS.


# EXECUTANDO

Na pasta DSK tem o arquivo MSXRADIOXX.DSK contendo todos os scripts e base dados necessária para execução. Você pode gravar um disco real (saudosismo bateu alto aqui) ou iniciar pelo SofaROM.

Se quiser iniciar manualmente os scripts, execute o comando abaixo no BASIC:

LOAD "RADIO.BAS",R


# SCRIPTS
|Arquivo|Descrição|
|RADIO.BAS|Menu de inicialização da aplicação|
|GSCALDST.BAS|Cálculo de distância entre dois Grid Square Locators|
|CSCOFIND.BAS|País do indicativo|


