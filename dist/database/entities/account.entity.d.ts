import { User } from './user.entity';
export declare class Account {
    id: number;
    token: string;
    created_at: Date;
    user: User[];
}
