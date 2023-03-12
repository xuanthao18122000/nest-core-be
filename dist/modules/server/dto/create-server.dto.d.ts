import { typeServer } from 'src/database/entities/server.entity';
import { listServiceCreateDto } from '../../services/dto/create-service.dto';
export declare class CreateServerDto {
    ip: string;
    name: string;
    description: string;
    status: string;
    type: typeServer;
    memory: number;
    used: number;
    cpu: number;
    cpus: number;
    uptime: number;
    platform: string;
    listService: listServiceCreateDto[];
}
