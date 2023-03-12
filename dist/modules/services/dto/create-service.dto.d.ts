import { Server } from 'src/database/entities/server.entity';
export declare class listServiceCreateDto {
    constructor(init?: Partial<listServiceCreateDto>);
    typeServer: string;
    ip: string;
    server: Server;
    tracking: number;
    pid: number;
    name: string;
    extra: string;
    pm2: object;
    manual: string;
    monit: object;
}
export declare class listServiceUpdateDto {
    constructor(init?: Partial<listServiceUpdateDto>);
    ip: string;
    server: Server;
    tracking: number;
    id: number;
    pid: number;
    name: string;
    extra: string;
    pm2: object;
    manual: string;
    monit: object;
}
export declare class CreateServiceDto {
    pid: number;
    name: string;
    pm2: string;
    manual: string;
    monit: string;
    extra: string;
    tracking: string;
    id_server: number;
    type_server: number;
}
