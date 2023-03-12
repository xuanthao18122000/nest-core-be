"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const custom_subcribe_1 = require("../utils/custom-subcribe");
const typeorm_1 = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();
exports.appDataSource = new typeorm_1.DataSource({
    name: process.env.DB_NAME,
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*.ts', 'dist/src/migrations/*{.ts,.js}'],
    extra: {
        charset: 'utf8mb4_unicode_ci',
    },
    subscribers: [custom_subcribe_1.mySubscriber],
    synchronize: false,
});
exports.appDataSource.initialize();
//# sourceMappingURL=datasource.js.map