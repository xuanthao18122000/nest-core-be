import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Account } from 'src/database/entities/account.entity';
import {Role} from "src/database/entities/role.entity";
import {RoleService} from "../role/role.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Account, Role])],
  controllers: [UserController],
  providers: [UserService, RoleService],
  exports: [UserService],
})
export class UserModule {}
