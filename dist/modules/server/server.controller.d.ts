import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { ServerWebhookDto } from './dto/server-webhook.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { QueryListDto } from './dto/list-server.dto';
import { ServicesService } from '../services/services.service';
export declare class ServerController {
    private readonly serverService;
    private readonly serviceService;
    constructor(serverService: ServerService, serviceService: ServicesService);
    createFromWebhook(createWebhookDto: ServerWebhookDto): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    create(createServerDto: CreateServerDto): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    listServer(query: QueryListDto): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    detailServer(id: number): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    update(id: string, updateServerDto: UpdateServerDto): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    removeServer(id: number): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
}
