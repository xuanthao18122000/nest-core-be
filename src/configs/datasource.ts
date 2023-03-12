import { join } from 'path';
import { mySubscriber } from 'src/utils/custom-subcribe';
import { DatabaseType, DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const appDataSource = new DataSource({
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
    subscribers: [mySubscriber],
    synchronize: false,
});

appDataSource.initialize();
