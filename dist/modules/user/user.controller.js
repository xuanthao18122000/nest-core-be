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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const query_list_dto_1 = require("../../global/dto/query-list.dto");
const send_response_1 = require("../../utils/send-response");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getAllUser(query) {
        try {
            query.perPage = !query.perPage ? 10 : query.perPage;
            query.page = !query.page ? 1 : query.page;
            query.sort ? query.sort.toUpperCase() : 'DESC';
            const users = await this.userService.getAllUser(query);
            const pagi = (users.count / query.perPage) | 0;
            const pages = users.count % query.perPage == 0 ? pagi : pagi + 1;
            const page = +query.page;
            const total = users.count;
            return send_response_1.SendResponse.success({
                page,
                pages,
                total,
                listUser: users.list,
            }, 'Get list users success!');
        }
        catch (error) {
            console.log(error);
            return send_response_1.SendResponse.error(error);
        }
    }
    async getOneUser(id) {
        try {
            const user = await this.userService.getOneUser(id);
            return send_response_1.SendResponse.success(user, 'Get user success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async deleteUser(id) {
        try {
            const result = await this.userService.deleteUser(id);
            if (result) {
                return send_response_1.SendResponse.success([], 'Delete user success!');
            }
            throw 'BACKEND';
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_list_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOneUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)(''),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map