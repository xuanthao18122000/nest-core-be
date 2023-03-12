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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const services_service_1 = require("./services.service");
const server_service_1 = require("../server/server.service");
const create_service_dto_1 = require("./dto/create-service.dto");
const update_service_dto_1 = require("./dto/update-service.dto");
const send_response_1 = require("../../utils/send-response");
const jwt_guard_1 = require("../../guard/jwt.guard");
const auth_decorator_1 = require("../../decorators/auth.decorator");
const code_1 = require("../../configs/code");
const swagger_1 = require("@nestjs/swagger");
const server_entity_1 = require("../../database/entities/server.entity");
const list_service_dto_1 = require("../services/dto/list-service.dto");
let ServicesController = class ServicesController {
    constructor(servicesService, serverService) {
        this.servicesService = servicesService;
        this.serverService = serverService;
    }
    async listService(query) {
        try {
            const result = await this.servicesService.listService(query);
            return send_response_1.SendResponse.success(result, 'Get list server success!');
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async detailService(id) {
        try {
            const details = await this.servicesService.detailService(id);
            const server = await this.serverService.detailServer(details.id_server);
            if (details) {
                if (server.type == server_entity_1.typeServer.MANUAL) {
                    return send_response_1.SendResponse.success({
                        name: details.name,
                        extra: details.extra,
                        pm2: details.pm2,
                        ip: details.ip,
                        id_server: details.id_server,
                        tracking: details.tracking,
                        created_at: details.created_at,
                        updated_at: details.updated_at,
                    }, 'Get detail service success!');
                }
                return send_response_1.SendResponse.success(details, 'Get detail service success!');
            }
            else {
                return send_response_1.SendResponse.error('Get detail service failed!');
            }
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async create(createServiceDto) {
        try {
            const createService = await this.servicesService.createOneService(createServiceDto);
            if (createService) {
                return send_response_1.SendResponse.success([], 'Create service success!');
            }
            else {
                return send_response_1.SendResponse.error('Create service failed!');
            }
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async update(id, body) {
        try {
            const updateService = await this.servicesService.update(id, body);
            if (updateService) {
                return send_response_1.SendResponse.success([], 'Update server success!');
            }
            else {
                throw code_1.default.BACKEND.type;
            }
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async removeService(id) {
        try {
            const deleteService = await this.servicesService.deleteService(id);
            if (deleteService) {
                return send_response_1.SendResponse.success([], 'Delete service success!');
            }
            else {
                return send_response_1.SendResponse.error('DELETE_SERVER_FAILED');
            }
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
};
__decorate([
    (0, common_1.Get)('list'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_service_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "listService", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "detailService", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, auth_decorator_1.Auth)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_dto_1.CreateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, auth_decorator_1.Auth)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_service_dto_1.UpdateServiceDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, auth_decorator_1.Auth)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "removeService", null);
ServicesController = __decorate([
    (0, swagger_1.ApiTags)('Service'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [services_service_1.ServicesService,
        server_service_1.ServerService])
], ServicesController);
exports.ServicesController = ServicesController;
//# sourceMappingURL=services.controller.js.map