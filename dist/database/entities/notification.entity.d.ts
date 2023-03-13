import { User } from "./user.entity";
export declare class Notification {
    id: number;
    title: string;
    image: string;
    description: string;
    content: string;
    is_read: boolean;
    created_at: Date;
    updated_at: Date;
    delete_at: Date;
    user: User[];
}
