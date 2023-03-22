import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database.module';
import { RouterModule } from '@nestjs/core';
import { Routes } from './routes/route';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import {RoleModule} from "./modules/role/role.module";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { RiceModule } from "./modules/rice/rice.module";
import { TransactionModule } from "./modules/transaction/transaction.module";
import { NotificationModule } from "./modules/notification/notification.module";
import {ImageModule} from "./modules/image/image.module";
import {TransactionService} from "./modules/transaction/transaction.service";
import {Transaction, User, UserRice} from "./database/entities";
import {UserService} from "./modules/user/user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRice]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'src/upload/images'),
    //   exclude: ['/api*'],
    // }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <server@kagasss.info> ',
      },
      template: {
        dir: join(__dirname,'../../../src' ,'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    RouterModule.register(Routes),
    DatabaseModule,
    AuthModule,
    RiceModule,
    ImageModule,
    TransactionModule,
    NotificationModule,
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserService],


})
export class AppModule {}
