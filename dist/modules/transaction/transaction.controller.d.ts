export declare class TransactionController {
    constructor();
    getAllTransaction(): Promise<void>;
    getTransactionByUser(): Promise<void>;
    getOneTransaction(): Promise<void>;
    sendMoneyToUser(): Promise<void>;
    sendMoneyToExchanges(): Promise<void>;
}
