import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Put, Query
} from "@nestjs/common";
import { UserService } from './user.service';
import { ApiTags } from "@nestjs/swagger";
import { QueryListDto } from "../../global/dto/query-list.dto";
import { SendResponse } from "../../utils/send-response";
import {User} from "../../database/entities";

@ApiTags('User')
@Controller('')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get('list')
  async getAllUser(@Query() query: QueryListDto) {
    try{
      query.perPage = !query.perPage ? 10 : query.perPage;
      query.page = !query.page ? 1 : query.page;
      query.sort ? query.sort.toUpperCase() : 'DESC';

      const users = await this.userService.getAllUser(query);

      const pagi = (users.count / query.perPage) | 0;
      const pages = users.count % query.perPage == 0 ? pagi : pagi + 1;
      const page = +query.page;
      const total = users.count;

      return SendResponse.success( {
        page,
        pages,
        total,
        listUser: users.list,
      },'Get list users success!')

    }catch (error) {
      console.log(error);
      return SendResponse.error(error);
    }
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number) {
    try{
      const user = await this.userService.getOneUser(id);

      return SendResponse.success(user, 'Get user success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  // @Post('create')
  // async createUser() {
  //
  // }

  // @Put(':id')
  // async updateUser(){
  //
  // }

  @Delete(':id')
  async deleteUser(@Param('id') id: number) {
    try{
      const result = await this.userService.deleteUser(id);

      if (result){
        return SendResponse.success([], 'Delete user success!')
      }
      throw 'BACKEND';
    }catch (error) {
      return SendResponse.error(error);
    }
  }
}
