import { Account } from './account.entity';
import { Role } from './role.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    fullName: string;
    phone: number;
    address_wallet: string;
    balance: number;
    code: number;
    created_at: Date;
    updated_at: Date;
    accounts: Account[];
    role: Role[];
}
