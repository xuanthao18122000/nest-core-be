import {Controller, Get, Param, Post, Query, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {TransactionService} from "./transaction.service";
import {GetUser} from "../../decorators/auth.decorator";
import {SendResponse} from "../../utils/send-response";
import code from "../../configs/code";
import {QueryListDto} from "../../global/dto/query-list.dto";
import {JwtAuthGuard} from "../../guard/jwt.guard";

@ApiTags('Transaction')
@Controller()
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService
  ){}

  @Get('list')
  async getAllTransaction(@Query() query: QueryListDto){
    try{

    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get('by-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTransactionByUser(@GetUser() user, @Query() query: QueryListDto){
    try{
      if(!user){
        throw code.USER_NOT_FOUND.type
      }
      const email = user.email;
      query.page = !query.page ? 1 : query.page;
      query.perPage = !query.perPage ? 10 : query.perPage;
      query.sort ? query.sort.toUpperCase() : 'DESC'



      const transaction = await this.transactionService.getTransactionByUser(email, query);

      const pagi = (transaction.count / query.perPage) | 0;
      const pages = transaction.count % query.perPage == 0 ? pagi : pagi + 1;
      const page = +query.page;
      const total = transaction.count;
      return SendResponse.success({
        page,
        pages,
        total,
        listTransaction: transaction.list,
      },'Get list transaction success!');
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get(':id')
  async getOneTransaction(@Param('id') id: number){
    try{
      const transaction = await this.transactionService.getDetailTransaction(id);

      return SendResponse.success(transaction,'Get details transaction success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Post('send-money-user')
  async sendMoneyToUser(){

  }

  @Post('send-money-exchanges')
  async sendMoneyToExchanges(){

  }

}