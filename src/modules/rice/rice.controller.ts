import { Body, Controller, Delete, Get, Post, Put, Query, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RiceService } from "./rice.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
import { SendResponse } from "../../utils/send-response";

@ApiTags('Rice')
@Controller()
export class RiceController {
  constructor(
    private readonly riceService: RiceService
  ){}

  @ApiBearerAuth()
  @Get('list')
  async getAllRice(@Query() query: QueryListDto) {
    try{
      query.page = !query.page ? 1 : query.page;
      query.perPage = !query.perPage ? 10 : query.perPage;
      query.sort ? query.sort.toUpperCase() : 'DESC'

      const listRice = await this.riceService.getAllRice(query);

      const pagi = (listRice.count / query.perPage) | 0;
      const pages = listRice.count % query.perPage == 0 ? pagi : pagi + 1;
      const page = +query.page;
      const total = listRice.count;

      return SendResponse.success({
        page,
        pages,
        total,
        listNotification: listRice.list,
      },'Get list rice success!');

    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get(':id')
  async getOneRice(@Param('id') id: number) {
    try{
      const rice = await this.riceService.getOneRice(id);

      return SendResponse.success(rice, 'Get details rice success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get('by-user')
  async getRiceByUser() {

  }

  @Post('create')
  async createRice() {

  }

  @Put(':id')
  async updateRice() {

  }

  @Delete(':id')
  async deleteRice() {

  }
}