import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Account, Rice, UserRice} from "../../database/entities";
import { RiceController } from "./rice.controller";
import { RiceService } from "./rice.service";

@Module({
  imports: [TypeOrmModule.forFeature([Rice, Account, UserRice])],
  controllers: [RiceController],
  providers: [RiceService],
})
export class RiceModule {}