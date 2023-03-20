import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account, Notification } from "../../database/entities";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";


@Module({
  imports: [TypeOrmModule.forFeature([Notification, Account])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule{}