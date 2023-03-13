import {InjectRepository} from "@nestjs/typeorm";
import {Transaction} from "../../database/entities";
import {Repository} from "typeorm";
import code from "../../configs/code";
import {QueryListDto} from "../../global/dto/query-list.dto";

export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>
    ) {}
    async getTransactionByUser(email: string, query: QueryListDto) {
        try{
            const { keyword, page, perPage, sort } = query;
            const transaction = await this.transactionRepo.findAndCount({
                select: {
                    id: true,
                    amount: true,
                    status: true,
                    from_address: true,
                    to_address: true,
                    from_email: true,
                    to_email: true,
                    from_user: true,
                    to_user: true,
                    type: true,
                    description: true,
                    image: true,
                },
                where: {users: { email } },
                skip: (page - 1) * perPage,
                take: perPage,
                order: { id: sort as SORT },
            })
            return { list: transaction[0], count: transaction[1] };
        }catch (error) {
            throw error;
        }
    }

    async getDetailTransaction(id: number) {
        try{
            const transaction = await this.transactionRepo.findOne({
                where: { id }
            });

            if(!transaction){
                throw code.TRANSACTION_NOT_FOUND.type;
            }

            return transaction;
        }catch (error) {
            throw error;
        }
    }
}