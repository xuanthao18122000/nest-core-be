"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const dto_1 = require("./dto");
const send_response_1 = require("../../utils/send-response");
const api_error_response_1 = require("../../schema/api_error_response");
const code_1 = require("../../configs/code");
const jwt_1 = require("@nestjs/jwt");
const auth_decorator_1 = require("../../decorators/auth.decorator");
const jwt_guard_1 = require("../../guard/jwt.guard");
const swagger_1 = require("@nestjs/swagger");
const role_service_1 = require("../role/role.service");
let AuthController = class AuthController {
    constructor(authService, userService, roleService, jwtService) {
        this.authService = authService;
        this.userService = userService;
        this.roleService = roleService;
        this.jwtService = jwtService;
    }
    async login(dto) {
        try {
            const user = await this.authService.login(dto);
            if (!user) {
                return send_response_1.SendResponse.error({ msg: 'Email does not exist!' });
            }
            const token = await this.authService.signTokenVerify(user);
            const account = {
                token: token['accessToken'],
                user_id: user['id'],
            };
            const saveToken = await this.authService.saveTokenToDB(account);
            return send_response_1.SendResponse.success({
                token: token['accessToken'],
                expriresIn: token['expiresIn'],
            }, 'Login success!');
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async logOut(headers) {
        try {
            const token = headers.authorization.split('Bearer ');
            await this.authService.deleteToken(token[1]);
            return send_response_1.SendResponse.success([], 'Logout user successful!');
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async Register(body) {
        try {
            const checkRoles = await this.roleService.createRoles();
            if (!checkRoles) {
                return send_response_1.SendResponse.error('BACKEND');
            }
            const newUser = await this.userService.registerUser(body);
            if (newUser) {
                return send_response_1.SendResponse.success([], 'Register user successful!');
            }
            else {
                return send_response_1.SendResponse.error('BACKEND');
            }
        }
        catch (e) {
            return send_response_1.SendResponse.error(e);
        }
    }
    async UserInfo(headers, user, req) {
        try {
            const findUser = await user_service_1.UserService.StaticFindUserById(req.user);
            const listRole = findUser.role.map((o) => o.role_key);
            const user_info = {
                email: user.email,
                fullName: user.fullName,
                phone: user.phone,
                role: listRole,
            };
            return send_response_1.SendResponse.success([user_info], 'Get user info successful!');
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
};
__decorate([
    (0, common_1.Post)('login'),
    (0, api_error_response_1.ApiErrorResponse)(code_1.default.WRONG_PASSWORD),
    (0, api_error_response_1.ApiErrorResponse)(code_1.default.USER_NOT_FOUND),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.LoginPostDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Headers)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterPostDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Register", null);
__decorate([
    (0, common_1.Get)('user-info'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, auth_decorator_1.GetUser)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "UserInfo", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService,
        role_service_1.RoleService,
        jwt_1.JwtService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map