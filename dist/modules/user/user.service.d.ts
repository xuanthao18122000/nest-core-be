import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { ChangePasswordDTO, RegisterPostDTO } from '../auth/dto/index';
import { RoleService } from "../role/role.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
export declare class UserService {
    private readonly userRepo;
    private readonly roleService;
    constructor(userRepo: Repository<User>, roleService: RoleService);
    findUserByEmail(email: string): Promise<User>;
    static StaticFindUserById(UserId: any): Promise<User>;
    findUserById(id: number): Promise<User>;
    registerUser(user: RegisterPostDTO): Promise<User>;
    generateRandomString(myLength: any): string;
    getAllUser(query: QueryListDto): Promise<{
        list: User[];
        count: number;
    }>;
    getOneUser(id: number): Promise<User>;
    changePassword(id: number, body: ChangePasswordDTO): Promise<User>;
    forgotPassword(email: string): Promise<User>;
    sendEmail(email: string): Promise<boolean>;
    deleteUser(id: number): Promise<User>;
}
