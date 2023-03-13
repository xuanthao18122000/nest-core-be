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
exports.RiceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rice_service_1 = require("./rice.service");
const query_list_dto_1 = require("../../global/dto/query-list.dto");
const send_response_1 = require("../../utils/send-response");
const auth_decorator_1 = require("../../decorators/auth.decorator");
const jwt_guard_1 = require("../../guard/jwt.guard");
const dto_1 = require("./dto");
let RiceController = class RiceController {
    constructor(riceService) {
        this.riceService = riceService;
    }
    async getAllRice(query) {
        try {
            query.page = !query.page ? 1 : query.page;
            query.perPage = !query.perPage ? 10 : query.perPage;
            query.sort ? query.sort.toUpperCase() : 'DESC';
            const listRice = await this.riceService.getAllRice(query);
            const pagi = (listRice.count / query.perPage) | 0;
            const pages = listRice.count % query.perPage == 0 ? pagi : pagi + 1;
            const page = +query.page;
            const total = listRice.count;
            return send_response_1.SendResponse.success({
                page,
                pages,
                total,
                listRice: listRice.list,
            }, 'Get list rice success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async getOneRice(id) {
        try {
            const rice = await this.riceService.getOneRice(id);
            return send_response_1.SendResponse.success(rice, 'Get details rice success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async getRiceByUser(user, query) {
        try {
            const email = user.email;
            query.page = !query.page ? 1 : query.page;
            query.perPage = !query.perPage ? 10 : query.perPage;
            query.sort ? query.sort.toUpperCase() : 'DESC';
            const listRice = await this.riceService.getRiceUser(email, query);
            const pagi = (listRice.count / query.perPage) | 0;
            const pages = listRice.count % query.perPage == 0 ? pagi : pagi + 1;
            const page = +query.page;
            const total = listRice.count;
            return send_response_1.SendResponse.success({
                page,
                pages,
                total,
                listRice: listRice.list,
            }, 'Get list rice success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async createRice(body) {
        try {
            const result = await this.riceService.createRice(body);
            if (!result) {
                throw 'BACKEND';
            }
            return send_response_1.SendResponse.success([], 'Create rice success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async updateRice(body) {
        try {
            const result = await this.riceService.updateRice(body);
            if (!result) {
                throw 'BACKEND';
            }
            return send_response_1.SendResponse.success([], 'Update rice success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async deleteRice(id) {
        try {
            const result = await this.riceService.deleteRice(id);
            if (result) {
                return send_response_1.SendResponse.success([], 'Delete rice success!');
            }
            throw 'BACKEND';
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_list_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], RiceController.prototype, "getAllRice", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RiceController.prototype, "getOneRice", null);
__decorate([
    (0, common_1.Get)('by-user/list'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, auth_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_list_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], RiceController.prototype, "getRiceByUser", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RicePostDTO]),
    __metadata("design:returntype", Promise)
], RiceController.prototype, "createRice", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RicePutDTO]),
    __metadata("design:returntype", Promise)
], RiceController.prototype, "updateRice", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RiceController.prototype, "deleteRice", null);
RiceController = __decorate([
    (0, swagger_1.ApiTags)('Rice'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [rice_service_1.RiceService])
], RiceController);
exports.RiceController = RiceController;
//# sourceMappingURL=rice.controller.js.map