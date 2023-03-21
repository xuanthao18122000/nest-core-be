import { join } from 'path';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import {Account, Role, Rice, Transaction, Notification, User, UserRice} from 'src/database/entities';

const DatabaseConfig = {
  name: process.env.DB_NAME,
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  entities: [ Account, Role, User , Transaction, Notification, Rice, UserRice],
  migrations: ['src/migrations/*.ts', 'dist/src/migrations/*{.ts,.js}'],
  seeds: ['dist/**/*.seeds{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
  synchronize: false,
  dropSchema: false,
} as TypeOrmModuleAsyncOptions;



export default DatabaseConfig;
