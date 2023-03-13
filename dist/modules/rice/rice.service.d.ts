import { QueryListDto } from "../../global/dto/query-list.dto";
import { Rice } from "../../database/entities";
import { Repository } from "typeorm";
import { RicePostDTO, RicePutDTO } from "./dto";
export declare class RiceService {
    private readonly riceRepo;
    constructor(riceRepo: Repository<Rice>);
    getAllRice(query: QueryListDto): Promise<{
        list: Rice[];
        count: number;
    }>;
    getOneRice(id: number): Promise<Rice>;
    getRiceUser(email: string, query: QueryListDto): Promise<{
        list: Rice[];
        count: number;
    }>;
    createRice(body: RicePostDTO): Promise<boolean>;
    updateRice(body: RicePutDTO): Promise<boolean>;
    deleteRice(id: number): Promise<Rice>;
}
