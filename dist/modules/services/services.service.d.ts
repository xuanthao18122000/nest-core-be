import { Service } from '../../database/entities/service.entity';
import { Server } from '../../database/entities/server.entity';
import { Repository } from 'typeorm';
export declare class ServicesService {
    private readonly serviceRepo;
    private readonly serverRepo;
    constructor(serviceRepo: Repository<Service>, serverRepo: Repository<Server>);
    createServiceWebhook(body: any): Promise<false | import("typeorm").InsertResult>;
    createService(body: any): Promise<false | import("typeorm").InsertResult>;
    updateService(body: any): Promise<false | import("typeorm").InsertResult>;
    createOneService(body: any): Promise<Service>;
    listSearchService(query: any): Promise<{
        list: Service[];
        total: number;
        perPage: number;
        current_page: number;
    }>;
    listService(query: any): Promise<{
        list: Service[];
        total: number;
        perPage: number;
        current_page: number;
    }>;
    detailService(id: number): Promise<Service>;
    update(id: number, body: any): Promise<Service>;
    deleteService(id: number): Promise<Service>;
    deleteMutipleService(id: number): Promise<boolean>;
}
