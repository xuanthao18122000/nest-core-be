"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../database/entities");
const DatabaseConfig = {
    name: process.env.DB_NAME,
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: [entities_1.Account, entities_1.Role, entities_1.User, entities_1.Transaction, entities_1.Notification, entities_1.Rice],
    migrations: ['src/migrations/*.ts', 'dist/src/migrations/*{.ts,.js}'],
    seeds: ['dist/**/*.seeds{.ts,.js}'],
    cli: {
        migrationsDir: 'src/migrations',
    },
    synchronize: true,
    dropSchema: false,
};
exports.default = DatabaseConfig;
//# sourceMappingURL=database.js.map