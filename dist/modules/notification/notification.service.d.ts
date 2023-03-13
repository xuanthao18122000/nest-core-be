import { QueryListDto } from "../../global/dto/query-list.dto";
import { Notification } from "../../database/entities";
import { Repository } from "typeorm";
export declare class NotificationService {
    private readonly notificationRepo;
    constructor(notificationRepo: Repository<Notification>);
    getAllNotification(query: QueryListDto): Promise<{
        list: Notification[];
        count: number;
    }>;
    getOneNotification(id: number): Promise<Notification>;
    readNotification(id: number): Promise<Notification>;
}
