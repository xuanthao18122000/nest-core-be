import { Server } from "../../../database/entities/server.entity";
export declare class serviceWebhookDto {
    constructor(init?: Partial<serviceWebhookDto>);
    ip: string;
    server: Server;
    tracking: number;
    extra: string;
    manual: string;
    pid: number;
    name: string;
    pm2: object;
    monit: object;
}
