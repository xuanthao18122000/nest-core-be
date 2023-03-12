import { RiceService } from "./rice.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
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
    getRiceByUser(): Promise<void>;
    createRice(): Promise<void>;
    updateRice(): Promise<void>;
    deleteRice(): Promise<void>;
}
