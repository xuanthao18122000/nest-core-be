import { User } from './user.entity';
export declare class Role {
    role_id: number;
    role_key: string;
    role_name: string;
    user: User[];
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}
