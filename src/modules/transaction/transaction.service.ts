import {InjectRepository} from "@nestjs/typeorm";
import {Transaction, User} from "../../database/entities";
import {Repository} from "typeorm";
import code from "../../configs/code";
import {QueryListDto} from "../../global/dto/query-list.dto";

export class TransactionService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepo: Repository<Transaction>
    ) {}
    async getAllTransaction(query: QueryListDto) {
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
                    created_at: true,
                },
                skip: (page - 1) * perPage,
                take: perPage,
                order: { id: sort as SORT },
            })
            return { list: transaction[0], count: transaction[1] };
        }catch (error) {
            throw error;
        }
    }

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
                where: { user: { email } },
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

    async createHistoryTransactionReceiver(sender: User, receiver: User, amount: number, description: string){
        try{
            const newTransaction = await this.transactionRepo.create({
                type: 'receive_money',
                amount,
                image: '',
                status: 'success',
                from_address: sender.address_wallet,
                to_address: receiver.address_wallet,
                from_email: sender.email,
                to_email: receiver.email,
                from_user: sender.fullName,
                to_user: receiver.fullName,
                description,
                user: receiver,
            })

            return  await this.transactionRepo.save(newTransaction);
        }catch (error) {
            throw error;
        }
    }

    async createHistoryTransactionSender(sender: User, receiver: User, amount: number, description: string){
        try{
            const newTransaction = await this.transactionRepo.create({
                type: 'transfer_money',
                amount,
                image: '',
                status: 'success',
                from_address: sender.address_wallet,
                to_address: receiver.address_wallet,
                from_email: sender.email,
                to_email: receiver.email,
                from_user: sender.fullName,
                to_user: receiver.fullName,
                description,
                user: sender,
            })

            return await this.transactionRepo.save(newTransaction);
        }catch (error) {
            throw error;
        }
    }

    async createHistoryTransactionBuyer(buyer: User, receiver: User, amount: number, description: string): Promise<Transaction>{
        try{
            const newTransaction = await this.transactionRepo.create({
                type: 'buy_rice',
                amount,
                image: '',
                status: 'success',
                from_address: buyer.address_wallet,
                to_address: receiver.address_wallet,
                from_email: buyer.email,
                to_email: receiver.email,
                from_user: buyer.fullName,
                to_user: receiver.fullName,
                description,
                user: buyer,
            })

            return await this.transactionRepo.save(newTransaction);
        }catch (error) {
            throw error;
        }
    }

    async createHistoryTransactionSeller(seller: User, receiver: User, amount: number, description: string): Promise<Transaction>{
        try{
            const newTransaction = await this.transactionRepo.create({
                type: 'sell_rice',
                amount,
                image: '',
                status: 'success',
                from_address: seller.address_wallet,
                to_address: receiver.address_wallet,
                from_email: seller.email,
                to_email: receiver.email,
                from_user: seller.fullName,
                to_user: receiver.fullName,
                description,
                user: seller,
            })

            return await this.transactionRepo.save(newTransaction);
        }catch (error) {
            throw error;
        }
    }
}