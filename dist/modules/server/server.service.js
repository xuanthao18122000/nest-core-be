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
exports.ServerService = void 0;
const common_1 = require("@nestjs/common");
const server_entity_1 = require("../../database/entities/server.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const code_1 = require("../../configs/code");
let ServerService = class ServerService {
    constructor(serverRepo) {
        this.serverRepo = serverRepo;
    }
    async createServerWebhook(body) {
        try {
            const { ip, memory, name, description, status, type, used, cpu, cpus, uptime, platform, listService, } = body;
            const server = await this.serverRepo.findOne({
                where: { ip },
            });
            if (server) {
                const tracking = new Date(Date.now()) / 1000;
                server.ip = ip;
                server.name = name;
                server.memory = memory;
                server.used = used;
                server.cpu = cpu;
                server.cpus = cpus;
                server.uptime = uptime;
                server.platform = platform;
                server.tracking = tracking;
                return await this.serverRepo.save(server);
            }
            const tracking = new Date(Date.now()) / 1000;
            const newServer = await this.serverRepo.create({
                ip,
                name: ip,
                description: 'null',
                status: 'null',
                type: server_entity_1.typeServer.AUTO,
                memory,
                used,
                cpu,
                cpus,
                uptime,
                platform,
                tracking,
            });
            const saveServer = await this.serverRepo.save(newServer);
            if (!newServer || !saveServer) {
                throw 'BACKEND';
            }
            return newServer;
        }
        catch (err) {
            throw err;
        }
    }
    async createServer(body) {
        try {
            const { ip, memory, name, description, status, type, used, cpu, cpus, uptime, platform, listService, } = body;
            const checkIPServer = await this.serverRepo.findOne({
                where: { ip },
            });
            if (checkIPServer) {
                throw code_1.default.IP_SERVER_EXISTED.type;
            }
            const tracking = new Date(Date.now()) / 1000;
            const newServer = await this.serverRepo.create({
                ip,
                name,
                description,
                status,
                type: server_entity_1.typeServer.MANUAL,
                memory,
                used,
                cpu,
                cpus,
                uptime,
                platform,
                tracking,
            });
            const saveServer = await this.serverRepo.save(newServer);
            if (!newServer || !saveServer) {
                throw 'BACKEND';
            }
            return newServer;
        }
        catch (err) {
            throw err;
        }
    }
    async listServer(query) {
        try {
            let { keyword, page, perPage, sort_ip, sort_updated } = query;
            if (!page) {
                page = 1;
            }
            if (!perPage) {
                perPage = 10;
            }
            let servers;
            if (sort_updated) {
                servers = await this.serverRepo.findAndCount({
                    skip: (page - 1) * perPage,
                    take: perPage,
                    order: {
                        updated_at: sort_updated,
                    },
                    where: [
                        {
                            ip: keyword ? (0, typeorm_2.Like)(`%${keyword}%`) : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                        },
                        {
                            name: keyword ? (0, typeorm_2.Like)(`%${keyword}%`) : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                        },
                    ],
                    relations: ['services'],
                });
            }
            else {
                servers = await this.serverRepo.findAndCount({
                    skip: (page - 1) * perPage,
                    take: perPage,
                    order: {
                        created_at: sort_ip,
                    },
                    where: [
                        {
                            ip: keyword ? (0, typeorm_2.Like)(`%${keyword}%`) : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                        },
                        {
                            name: keyword ? (0, typeorm_2.Like)(`%${keyword}%`) : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                        },
                    ],
                    relations: ['services'],
                });
            }
            return {
                list: servers[0],
                total: servers[1],
                perPage: parseInt(perPage),
                current_page: parseInt(page),
            };
        }
        catch (e) {
            throw e;
        }
    }
    async detailServer(id) {
        try {
            const detail = await this.serverRepo.findOne({
                where: { id },
                relations: ['services'],
            });
            if (!detail) {
                throw code_1.default.SERVER_NOT_FOUND.type;
            }
            return detail;
        }
        catch (err) {
            throw err;
        }
    }
    async update(id, body) {
        try {
            const { ip, name, type, status, description, memory, used, cpu, cpus, uptime, platform, } = body;
            const tracking = new Date(Date.now()) / 1000;
            const server = await this.serverRepo.findOne({
                where: { id },
            });
            if (!server) {
                throw code_1.default.SERVER_NOT_FOUND.type;
            }
            const findByIp = await this.serverRepo.findOne({
                where: { ip },
            });
            if (findByIp && ip !== server.ip) {
                throw code_1.default.IP_SERVER_EXISTED.type;
            }
            if (server.type === server_entity_1.typeServer.MANUAL) {
                server.ip = ip;
                server.name = name;
                server.memory = memory;
                server.used = used;
                server.cpu = cpu;
                server.type = type;
                server.status = status;
                server.description = description;
                server.cpus = cpus;
                server.uptime = uptime;
                server.platform = platform;
                server.tracking = tracking;
            }
            else {
                server.name = name;
                server.description = description;
                server.tracking = tracking;
            }
            const saveUpdate = await this.serverRepo.save(server);
            return saveUpdate;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteServer(id) {
        try {
            const server = await this.serverRepo.findOne({
                where: { id },
            });
            if (!server) {
                throw 'SERVER_NOT_FOUND';
            }
            const remove = await this.serverRepo.remove(server);
            return remove;
        }
        catch (err) {
            throw err;
        }
    }
};
ServerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(server_entity_1.Server)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServerService);
exports.ServerService = ServerService;
//# sourceMappingURL=server.service.js.map