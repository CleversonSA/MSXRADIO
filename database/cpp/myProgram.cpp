#include "CallSignDB.h"
#include <iostream>

int main() {
    CallSignDB db;

    // Tente conectar ao banco de dados SQLite
    if (db.connect("callsigns.sqlite")) {
        std::cout << "Conexão com o banco de dados estabelecida com sucesso." << std::endl;
        
        std::string csCountry = db.getCountryFromCallSign("PU5TOS");

        if (!csCountry.empty()) {
            std::cout << "País: " << csCountry << std::endl;
        } else {
            std::cout << "País: " << "Não identificado" << std::endl;
        }

        // Chama o método getISO3660Code passando "Samoa (Independent State of)" como parâmetro
        std::string isoCode = db.getISO3166Code("Samoa (Independent State of)");

        // Exibe o resultado no console
        std::cout << "Código ISO 3166 para 'Samoa (Independent State of)': " << isoCode << std::endl;

    } else {
        std::cerr << "Falha ao conectar com o banco de dados." << std::endl;
        return 1; // Retorna um código de erro
    }

    // Aqui você pode adicionar mais lógica para interagir com o banco de dados

    return 0; // Sucesso
}