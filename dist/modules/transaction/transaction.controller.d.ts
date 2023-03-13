import { TransactionService } from "./transaction.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getAllTransaction(query: QueryListDto): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto>;
    getTransactionByUser(user: any, query: QueryListDto): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    getOneTransaction(id: number): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    sendMoneyToUser(): Promise<void>;
    sendMoneyToExchanges(): Promise<void>;
}
