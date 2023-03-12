import { ServicesService } from './services.service';
import { ServerService } from '../server/server.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { QueryListDto } from "../services/dto/list-service.dto";
export declare class ServicesController {
    private readonly servicesService;
    private readonly serverService;
    constructor(servicesService: ServicesService, serverService: ServerService);
    listService(query: QueryListDto): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    detailService(id: number): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    create(createServiceDto: CreateServiceDto): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    update(id: number, body: UpdateServiceDto): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    removeService(id: number): Promise<{
        code: number;
        success: boolean;
        data: any;
        msg: string;
    } | import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
}
