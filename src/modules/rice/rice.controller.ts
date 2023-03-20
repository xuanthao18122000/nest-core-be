import {Body, Controller, Delete, Get, Post, Put, Query, Param, UseGuards} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RiceService } from "./rice.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
import { SendResponse } from "../../utils/send-response";
import { Auth, GetUser } from "../../decorators/auth.decorator";
import {JwtAuthGuard} from "../../guard/jwt.guard";
import {RicePostDTO, RicePutDTO} from "./dto";
import code from "../../configs/code";

@ApiTags('Rice')
@Controller()
export class RiceController {
  constructor(
    private readonly riceService: RiceService
  ){}

  @ApiBearerAuth()
  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
        listRice: listRice.list,
      },'Get list rice success!');

    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getOneRice(@Param('id') id: number) {
    try{
      const rice = await this.riceService.getOneRice(id);

      return SendResponse.success(rice, 'Get details rice success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get('by-user/list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getRiceByUser(@GetUser() user, @Query() query: QueryListDto) {
    console.log('abc');
    try{
      const email = user.email;
      query.page = !query.page ? 1 : query.page;
      query.perPage = !query.perPage ? 10 : query.perPage;
      query.sort ? query.sort.toUpperCase() : 'DESC'
      const listRice = await this.riceService.getRiceUser(email, query);

      const pagi = (listRice.count / query.perPage) | 0;
      const pages = listRice.count % query.perPage == 0 ? pagi : pagi + 1;
      const page = +query.page;
      const total = listRice.count;
      return SendResponse.success({
        page,
        pages,
        total,
        listRice: listRice.list,
      },'Get list rice by user successful!');
    }catch (error) {
      console.log("BE: ", error);
      return SendResponse.error(error);
    }
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Auth({roles: ['ADMIN']})
  async createRice(@GetUser() user, @Body() body: RicePostDTO) {
    try{
      // Call user service check user is admin
      const name = body.name
      const rice = await this.riceService.findNameRice(name);
      if(rice){
        throw code.RICE_EXIST.type;
      }
      const result = await this.riceService.createRice(user, body);

      if(!result){
        throw 'BACKEND';
      }
      return SendResponse.success([], 'Create rice success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Auth({roles: ['ADMIN']})
  async updateRice(@Param('id') id: number, @Body() body: RicePutDTO) {
    try{
      const result = await this.riceService.updateRice( id, body);

      if(!result){
        throw 'BACKEND';
      }
      return SendResponse.success([], 'Update rice success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Auth({roles: ['ADMIN']})
  async deleteRice(@Param('id') id: number) {
    try{
      const result = await this.riceService.deleteRice(id);

      if (result){
        return SendResponse.success([], 'Delete rice success!')
      }
      throw 'BACKEND';
    }catch (error) {
      return SendResponse.error(error);
    }
  }
}