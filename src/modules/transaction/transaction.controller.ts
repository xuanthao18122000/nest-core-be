import { Controller, Get, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Transaction')
@Controller()
export class TransactionController {
  constructor(

  ){}

  @Get('list')
  async getAllTransaction(){

  }

  @Get('by-user')
  async getTransactionByUser(){

  }

  @Get(':id')
  async getOneTransaction(){

  }

  @Post('send-money-user')
  async sendMoneyToUser(){

  }

  @Post('send-money-exchanges')
  async sendMoneyToExchanges(){

  }

}