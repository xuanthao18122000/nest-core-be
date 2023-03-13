import { QueryListDto } from "../../global/dto/query-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "../../database/entities";
import { Repository } from "typeorm";
import code from "../../configs/code";


export class NotificationService{
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>
  ) {}

  async getAllNotification(query: QueryListDto){
    try{
      const { keyword, page, perPage, sort } = query;
      const notification = await this.notificationRepo.findAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        order: { id: sort as SORT },
      });
      return { list: notification[0], count: notification[1] };
    }catch(error) {
      throw error;
    }
  }

  async getOneNotification(id: number) {
    try{
      const oneRice = await this.notificationRepo.findOne({
        where: { id }
      })

      if(!oneRice){
        throw code.NOTIFICATION_NOT_FOUND.type;
      }
      return oneRice;
    }catch (error) {
      throw error;
    }
  }

  async readNotification(id: number) {
    try{
      const notification = await this.notificationRepo.findOne({
        where: { id }
      })

      if(!notification){
        throw code.NOTIFICATION_NOT_FOUND.type;
      }

      notification.is_read = true;
      return await this.notificationRepo.save(notification);

    }catch (error) {
      throw error;
    }
  }

}