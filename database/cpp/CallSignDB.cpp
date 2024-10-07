#include "CallSignDB.h"
#include <algorithm> // Para std::transform
#include <cctype>    // Para std::toupper
#include <iostream>
#include <stdexcept>

CallSignDB::CallSignDB() : db(nullptr) {}

CallSignDB::~CallSignDB() {
    if (db) {
        sqlite3_close(db);
    }
}

bool CallSignDB::connect(const std::string& dbPath) {
    if (sqlite3_open(dbPath.c_str(), &db) == SQLITE_OK) {
        std::cout << "Connected to the database successfully." << std::endl;
        return true;
    } else {
        std::cerr << "Can't connect to the database: " << sqlite3_errmsg(db) << std::endl;
        return false;
    }
}

std::string CallSignDB::getISO3166Code(const std::string& countryName) {
    if (!db) {
        throw std::runtime_error("Database not connected");
    }

    std::string sql = "SELECT iso3166code FROM tb_country WHERE description = ?";
    sqlite3_stmt* stmt;
    const char* tail;
    int rc = sqlite3_prepare_v2(db, sql.c_str(), -1, &stmt, &tail);
    if (rc != SQLITE_OK) {
        throw std::runtime_error("Failed to prepare statement: " + std::string(sqlite3_errmsg(db)));
    }

    sqlite3_bind_text(stmt, 1, countryName.c_str(), -1, SQLITE_STATIC);

    std::string isoCode;
    if (sqlite3_step(stmt) == SQLITE_ROW) {
        const char* code = reinterpret_cast<const char*>(sqlite3_column_text(stmt, 0));
        if (code) {
            isoCode = std::string(code);
        }
    } else {
        isoCode = "NULL"; // Use "NULL" string to indicate no result found
    }

    sqlite3_finalize(stmt);
    return isoCode;
}


std::string CallSignDB::getCountryFromCallSign(const std::string& callsign) {
    if (callsign.length() < 3) {
        return ""; // Retorna vazio se callsign for muito curto
    }

    // Extrai os três primeiros caracteres e converte para maiúsculas
    std::string csFormatted = callsign.substr(0, 3);
    std::transform(csFormatted.begin(), csFormatted.end(), csFormatted.begin(),
                   [](unsigned char c){ return std::toupper(c); });

    // Prepara a consulta SQL
    std::string query = "SELECT country FROM tb_callsign_country WHERE csPrefixFrom >= ?1 AND csPrefixTo <= ?1 ORDER BY csPrefixFrom DESC LIMIT 1";
    sqlite3_stmt* stmt;
    if (sqlite3_prepare_v2(db, query.c_str(), -1, &stmt, nullptr) == SQLITE_OK) {
        sqlite3_bind_text(stmt, 1, csFormatted.c_str(), -1, SQLITE_STATIC);

        if (sqlite3_step(stmt) == SQLITE_ROW) {
            // Se encontrou, retorna o país
            const unsigned char* result = sqlite3_column_text(stmt, 0);
            sqlite3_finalize(stmt);
            return std::string(reinterpret_cast<const char*>(result));
        }
        sqlite3_finalize(stmt);
    }
    // Retorna vazio se não encontrar ou ocorrer erro 
    return "";
}