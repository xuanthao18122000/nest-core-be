import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {Account, Rice} from "../../database/entities";
import { RiceController } from "./rice.controller";
import { RiceService } from "./rice.service";

@Module({
  imports: [TypeOrmModule.forFeature([Rice, Account])],
  controllers: [RiceController],
  providers: [RiceService],
})
export class RiceModule {}