import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Account, Role, Transaction, User, Notification, UserRice, Rice} from "../../database/entities";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import {UserService} from "../user/user.service";
import {RoleService} from "../role/role.service";
import {NotificationService} from "../notification/notification.service";
import {RiceService} from "../rice/rice.service";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Account, User, Role, Notification, UserRice, Rice])],
  controllers: [ TransactionController ],
  providers: [ TransactionService, UserService, RoleService, NotificationService, RiceService ],
  exports: [TransactionService],
})
export class TransactionModule{}