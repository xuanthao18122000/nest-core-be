import { Transaction } from "../../database/entities";
import { Repository } from "typeorm";
import { QueryListDto } from "../../global/dto/query-list.dto";
export declare class TransactionService {
    private readonly transactionRepo;
    constructor(transactionRepo: Repository<Transaction>);
    getTransactionByUser(email: string, query: QueryListDto): Promise<{
        list: Transaction[];
        count: number;
    }>;
    getDetailTransaction(id: number): Promise<Transaction>;
}
