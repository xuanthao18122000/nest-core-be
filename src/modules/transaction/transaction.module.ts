import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "../../database/entities";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [ TransactionController ],
  providers: [ TransactionService ],
})
export class TransactionModule{}