import { listServiceUpdateDto } from '../../services/dto/create-service.dto';
import { typeServer } from '../../../database/entities/server.entity';
export declare class UpdateServerDto {
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
    listService: listServiceUpdateDto[];
}
