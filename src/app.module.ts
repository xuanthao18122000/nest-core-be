import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database.module';
import { RouterModule } from '@nestjs/core';
import { Routes } from './routes/route';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import {RoleModule} from "./modules/role/role.module";
import { RiceModule } from "./modules/rice/rice.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { NotificationModule } from "./modules/notification/notification.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RouterModule.register(Routes),
    DatabaseModule,
    AuthModule,
    RiceModule,
    TransactionModule,
    NotificationModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
