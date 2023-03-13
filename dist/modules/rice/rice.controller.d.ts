import { RiceService } from "./rice.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
import { RicePostDTO, RicePutDTO } from "./dto";
export declare class RiceController {
    private readonly riceService;
    constructor(riceService: RiceService);
    getAllRice(query: QueryListDto): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    getOneRice(id: number): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    getRiceByUser(user: any, query: QueryListDto): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    createRice(body: RicePostDTO): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    updateRice(body: RicePutDTO): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    deleteRice(id: number): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
}
