import { Server } from './server.entity';
export declare enum typeService {
    AUTO = "auto",
    MANUAL = "manual"
}
export declare class Service {
    id: number;
    pid: number;
    name: string;
    extra: string;
    pm2: string;
    manual: string;
    monit: string;
    ip: string;
    id_server: number;
    type_server: string;
    type: typeService;
    tracking: number;
    created_at: Date;
    updated_at: Date;
    server: Server[];
}
