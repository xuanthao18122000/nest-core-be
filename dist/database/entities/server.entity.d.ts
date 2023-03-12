import { Service } from './service.entity';
export declare enum typeServer {
    AUTO = "auto",
    MANUAL = "manual"
}
export declare class Server {
    id: number;
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
    tracking: number;
    created_at: Date;
    updated_at: Date;
    services: Service[];
}
