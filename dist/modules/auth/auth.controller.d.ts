import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginPostDTO, RegisterPostDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { RoleService } from "../role/role.service";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    private readonly roleService;
    private jwtService;
    constructor(authService: AuthService, userService: UserService, roleService: RoleService, jwtService: JwtService);
    login(dto: LoginPostDTO): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    logOut(headers: any): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    Register(body: RegisterPostDTO): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
    UserInfo(headers: any, user: any, req: any): Promise<import("../../utils/dto/error_payload.dto").ErrorPayloadDto | {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    }>;
}
