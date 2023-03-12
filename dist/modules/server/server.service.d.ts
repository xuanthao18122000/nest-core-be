import { Server } from '../../database/entities/server.entity';
import { Repository } from 'typeorm';
export declare class ServerService {
    private readonly serverRepo;
    constructor(serverRepo: Repository<Server>);
    createServerWebhook(body: any): Promise<Server>;
    createServer(body: any): Promise<Server>;
    listServer(query: any): Promise<{
        list: any;
        total: any;
        perPage: number;
        current_page: number;
    }>;
    detailServer(id: number): Promise<Server>;
    update(id: any, body: any): Promise<Server>;
    deleteServer(id: number): Promise<Server>;
}
