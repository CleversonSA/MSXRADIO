#ifndef CALLSIGNDB_H
#define CALLSIGNDB_H

#include "sqlite3.h"
#include <string>

class CallSignDB {
public:
    CallSignDB();
    ~CallSignDB();
    bool connect(const std::string& dbPath);
    std::string getISO3166Code(const std::string& countryName);
    std::string getCountryFromCallSign(const std::string& callsign);
    

private:
    sqlite3* db;
};

#endif // CALLSIGNDB_H