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
exports.ServerController = void 0;
const common_1 = require("@nestjs/common");
const server_service_1 = require("./server.service");
const send_response_1 = require("../../utils/send-response");
const create_server_dto_1 = require("./dto/create-server.dto");
const server_webhook_dto_1 = require("./dto/server-webhook.dto");
const update_server_dto_1 = require("./dto/update-server.dto");
const jwt_guard_1 = require("../../guard/jwt.guard");
const code_1 = require("../../configs/code");
const swagger_1 = require("@nestjs/swagger");
const list_server_dto_1 = require("./dto/list-server.dto");
const services_service_1 = require("../services/services.service");
const auth_decorator_1 = require("../../decorators/auth.decorator");
let ServerController = class ServerController {
    constructor(serverService, serviceService) {
        this.serverService = serverService;
        this.serviceService = serviceService;
    }
    async createFromWebhook(createWebhookDto) {
        try {
            const newServer = await this.serverService.createServerWebhook(createWebhookDto);
            let listService = createWebhookDto.services;
            const tracking = new Date(Date.now()) / 1000;
            for (let i = 0; i < listService.length; i++) {
                listService[i].ip = newServer.ip;
                listService[i].server = newServer;
                listService[i].tracking = tracking;
            }
            const createService = await this.serviceService.createServiceWebhook({
                listService,
                id_server: newServer.id,
                type_server: newServer.type,
            });
            if (createService) {
                return send_response_1.SendResponse.success([], 'Create server success!');
            }
            else {
                await this.removeServer(newServer.id);
                return send_response_1.SendResponse.error('Create server failed!');
            }
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async create(createServerDto) {
        try {
            const newServer = await this.serverService.createServer(createServerDto);
            let listService = createServerDto.listService;
            const tracking = new Date(Date.now()) / 1000;
            for (let i = 0; i < listService.length; i++) {
                listService[i].ip = newServer.ip;
                listService[i].server = newServer;
                listService[i].typeServer = newServer.type;
                listService[i].tracking = tracking;
            }
            try {
                await this.serviceService.createService(listService);
            }
            catch (err) {
                await this.removeServer(newServer.id);
                return send_response_1.SendResponse.error('Create server failed!');
            }
            return send_response_1.SendResponse.success([], 'Create server success!');
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async listServer(query) {
        const { keyword, sort_ip, sort_updated } = query;
        try {
            const servers = await this.serverService.listServer(query);
            let services = {};
            if (keyword) {
                services = await this.serviceService.listSearchService(query);
                return send_response_1.SendResponse.success({
                    servers: servers['list'],
                    services: services['list'],
                }, 'Get list success!');
            }
            return send_response_1.SendResponse.success({
                servers: servers,
            }, 'Get list success!');
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async detailServer(id) {
        try {
            const details = await this.serverService.detailServer(id);
            if (details) {
                return send_response_1.SendResponse.success(details, 'Get detail server success!');
            }
            else {
                return send_response_1.SendResponse.error('Get detail server failed!');
            }
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async update(id, updateServerDto) {
        let listService = updateServerDto.listService;
        try {
            const updateServer = await this.serverService.update(id, updateServerDto);
            const tracking = new Date(Date.now()) / 1000;
            for (let i = 0; i < listService.length; i++) {
                listService[i].ip = updateServer.ip;
                listService[i].server = updateServer;
                listService[i].tracking = tracking;
            }
            const createService = await this.serviceService.updateService(listService);
            if (updateServer) {
                return send_response_1.SendResponse.success(updateServer, 'Update server success!');
            }
            else {
                throw code_1.default.BACKEND.type;
            }
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
    async removeServer(id) {
        try {
            const deleteService = await this.serviceService.deleteMutipleService(id);
            const deleteServer = await this.serverService.deleteServer(id);
            return send_response_1.SendResponse.success([], 'Delete server success!');
        }
        catch (err) {
            return send_response_1.SendResponse.error(err);
        }
    }
};
__decorate([
    (0, common_1.Post)('webhook-api/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [server_webhook_dto_1.ServerWebhookDto]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "createFromWebhook", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, auth_decorator_1.Auth)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_server_dto_1.CreateServerDto]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/list'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_server_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "listServer", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "detailServer", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, auth_decorator_1.Auth)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_server_dto_1.UpdateServerDto]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, auth_decorator_1.Auth)({ roles: ['ADMIN'] }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ServerController.prototype, "removeServer", null);
ServerController = __decorate([
    (0, swagger_1.ApiTags)('Server'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [server_service_1.ServerService,
        services_service_1.ServicesService])
], ServerController);
exports.ServerController = ServerController;
//# sourceMappingURL=server.controller.js.map