import { User } from "./user.entity";
export declare enum typeServer {
    AUTO = "auto",
    MANUAL = "manual"
}
export declare class Rice {
    id: number;
    name: string;
    images: string;
    totalQuantity: number;
    price: number;
    created_at: Date;
    updated_at: Date;
    delete_at: Date;
    users: User[];
}
