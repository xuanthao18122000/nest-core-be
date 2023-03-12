import { UserService } from './user.service';
import { QueryListDto } from "../../global/dto/query-list.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAllUser(query: QueryListDto): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    getOneUser(id: number): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    createUser(): Promise<void>;
    updateUser(): Promise<void>;
    deleteUser(): Promise<void>;
}
