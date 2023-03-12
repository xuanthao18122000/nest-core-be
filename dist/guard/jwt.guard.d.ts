import { Account } from '../database/entities/account.entity';
import { Repository } from 'typeorm';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    private readonly accountRepo;
    constructor(accountRepo: Repository<Account>);
    handleRequest(err: any, user: any, info: any, context: any, status: any): Promise<any>;
}
export {};
