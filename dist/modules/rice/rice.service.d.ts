import { QueryListDto } from "../../global/dto/query-list.dto";
import { Rice } from "../../database/entities";
import { Repository } from "typeorm";
export declare class RiceService {
    private readonly riceRepo;
    constructor(riceRepo: Repository<Rice>);
    getAllRice(query: QueryListDto): Promise<{
        list: Rice[];
        count: number;
    }>;
    getOneRice(id: number): Promise<Rice>;
}
