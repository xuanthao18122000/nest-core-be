"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerModule = void 0;
const common_1 = require("@nestjs/common");
const server_service_1 = require("./server.service");
const server_controller_1 = require("./server.controller");
const typeorm_1 = require("@nestjs/typeorm");
const server_entity_1 = require("../../database/entities/server.entity");
const services_service_1 = require("../services/services.service");
const service_entity_1 = require("../../database/entities/service.entity");
const account_entity_1 = require("../../database/entities/account.entity");
let ServerModule = class ServerModule {
};
ServerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([server_entity_1.Server, service_entity_1.Service, account_entity_1.Account])],
        controllers: [server_controller_1.ServerController],
        providers: [server_service_1.ServerService, services_service_1.ServicesService],
        exports: [server_service_1.ServerService],
    })
], ServerModule);
exports.ServerModule = ServerModule;
//# sourceMappingURL=server.module.js.map