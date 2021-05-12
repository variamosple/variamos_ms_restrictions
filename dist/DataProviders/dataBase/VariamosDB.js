"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'adminpg@variamosdbsvr',
    host: 'variamosdbsvr.postgres.database.azure.com',
    password: 'D6w9yRIWw7r92opvkVzp',
    database: 'VariamosDB',
    port: 5432
});
