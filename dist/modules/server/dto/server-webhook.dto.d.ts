import { serviceWebhookDto } from '../../services/dto/service-webhook.dto';
export declare class ServerWebhookDto {
    ip: string;
    memory: number;
    used: number;
    cpu: number;
    cpus: number;
    uptime: number;
    platform: string;
    services: serviceWebhookDto[];
}
