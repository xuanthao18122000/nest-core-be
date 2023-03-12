import { Controller, Get, Param, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { QueryListDto } from "../../global/dto/query-list.dto";
import { NotificationService } from "./notification.service";
import { SendResponse } from "../../utils/send-response";

@ApiTags('Notification')
@Controller()
export class NotificationController {
  constructor(
    private readonly notificationService : NotificationService
  ){}

  @Get('list')
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
  async getOneNotification(@Param('id') id: number){
    try{
      const notification = await this.notificationService.getOneNotification(id);

      return SendResponse.success(notification, 'Get details notification success!')
    }catch (error) {
      return SendResponse.error(error);
    }
  }

  @Get('read/:id')
  async readNotification(){

  }
}