import { Account } from './account.entity';
import { Notification } from './notification.entity';
import { Role } from './role.entity';
import { Transaction } from "./transaction.entity";
import { Rice } from "./rice.entity";
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
    delete_at: Date;
    accounts: Account[];
    notifications: Notification[];
    transactions: Transaction[];
    role: Role[];
    rice: Rice[];
}
export declare class UserRice {
    user_id: number;
    rice_id: number;
    quantity: number;
    created_at: Date;
    updated_at: Date;
}
