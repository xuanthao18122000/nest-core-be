import {Controller, Get, Param, Query, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import { QueryListDto } from "../../global/dto/query-list.dto";
import { NotificationService } from "./notification.service";
import { SendResponse } from "../../utils/send-response";
import {JwtAuthGuard} from "../../guard/jwt.guard";

@ApiTags('Notification')
@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService : NotificationService
  ){}

  @Get('list')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getAllNotification(@Query() query: QueryListDto){
    try{
      query.perPage = !query.perPage ? 10 : query.perPage;
      query.page = !query.page ? 1 : query.page;
      query.sort ? query.sort.toUpperCase() : 'DESC';

      const listNotification = await this.notificationService.getAllNotification(query);

      const pagi = (listNotification.count / query.perPage) | 0;
      const pages = listNotification.count % query.perPage == 0 ? pagi : pagi + 1;
      const page = +query.page;
      const total = listNotification.count;

      return SendResponse.success({
        page,
        pages,
        total,
        listNotification: listNotification.list,
      },'Get list notification success!');
    }catch(error) {
      return SendResponse.error(error);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getOneNotification(@Param('id') id: number){
    try{
      const notification = await this.notificationService.getOneNotification(id);

      return SendResponse.success(notification, 'Get details notification success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get('read/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async readNotification(@Param('id') id: number){
    try{
      const result = await this.notificationService.readNotification(id);

      if(!result) {
        throw 'BACKEND';
      }
      return SendResponse.success([], 'Read details notification success!')

    }catch (error) {
      return SendResponse.error(error)
    }
  }
}