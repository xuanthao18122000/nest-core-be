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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const code_1 = require("../../configs/code");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("../../database/entities/service.entity");
const server_entity_1 = require("../../database/entities/server.entity");
const typeorm_2 = require("typeorm");
let ServicesService = class ServicesService {
    constructor(serviceRepo, serverRepo) {
        this.serviceRepo = serviceRepo;
        this.serverRepo = serverRepo;
    }
    async createServiceWebhook(body) {
        try {
            const { listService, id_server, type_server } = body;
            let listUpdate = [];
            let listCreate = [];
            const tracking = new Date(Date.now()) / 1000;
            const deleteService = await this.serviceRepo.
                createQueryBuilder()
                .delete()
                .from(service_entity_1.Service)
                .where(`serverId = :serverId`, { serverId: id_server })
                .andWhere(`type = :type`, { type: service_entity_1.typeService.AUTO })
                .execute();
            for (const service of listService) {
                service.id_server = id_server;
                service.type_server = type_server;
                service.type = service_entity_1.typeService.AUTO;
            }
            const newService = await this.serviceRepo
                .createQueryBuilder()
                .insert()
                .into(service_entity_1.Service)
                .values(listService)
                .execute();
            if (!newService) {
                return false;
            }
            return newService;
        }
        catch (err) {
            throw err;
        }
    }
    async createService(body) {
        try {
            const listSever = body;
            let listUpdate = [];
            let listCreate = [];
            for (let i = 0; i < listSever.length; i++) {
                const checkService = await this.serviceRepo.findOne({
                    where: {
                        id: listSever[i].id
                    },
                });
                if (checkService && listSever[i].id != undefined) {
                    listUpdate.push(listSever[i]);
                }
                else {
                    listCreate.push(listSever[i]);
                }
            }
            const tracking = new Date(Date.now()) / 1000;
            if (listUpdate.length !== 0) {
                for (let i = 0; i < listUpdate.length; i++) {
                    const service = await this.serviceRepo.findOne({
                        where: { id: listUpdate[i].id },
                    });
                    service.pid = listUpdate[i].pid;
                    service.name = listUpdate[i].name;
                    service.extra = listUpdate[i].extra;
                    service.pm2 = listUpdate[i].pm2;
                    service.manual = listUpdate[i].manual;
                    service.monit = listUpdate[i].monit;
                    service.tracking = tracking;
                    service.ip = listUpdate[i].ip;
                    service.server = listUpdate[i].id_server;
                    service.type_server = listUpdate[i].type_server;
                    const update = await this.serviceRepo.save(service);
                }
            }
            const newService = await this.serviceRepo
                .createQueryBuilder()
                .insert()
                .into(service_entity_1.Service)
                .values(listCreate)
                .execute();
            if (!newService) {
                return false;
            }
            return newService;
        }
        catch (err) {
            throw 'BACKEND';
        }
    }
    async updateService(body) {
        try {
            const listSever = body;
            let listUpdate = [];
            let listCreate = [];
            for (let i = 0; i < listSever.length; i++) {
                const checkService = await this.serviceRepo.findOne({
                    where: {
                        id: listSever[i].id
                    },
                });
                if (checkService && listSever[i].id != undefined) {
                    listUpdate.push(listSever[i]);
                }
                else {
                    listCreate.push(listSever[i]);
                }
            }
            if (listUpdate.length !== 0) {
                const checkServer = await this.serverRepo.findOne({
                    where: { id: listSever[0].server.id },
                });
                for (let i = 0; i < listUpdate.length; i++) {
                    const service = await this.serviceRepo.findOne({
                        where: { id: listUpdate[i].id },
                    });
                    const tracking = new Date(Date.now()) / 1000;
                    if (checkServer.type === server_entity_1.typeServer.MANUAL) {
                        service.pid = listUpdate[i].pid;
                        service.name = listUpdate[i].name;
                        service.extra = listUpdate[i].extra;
                        service.pm2 = listUpdate[i].pm2;
                        service.manual = listUpdate[i].manual;
                        service.monit = listUpdate[i].monit;
                        service.tracking = tracking;
                        service.ip = listUpdate[i].ip;
                        service.server = listUpdate[i].id_server;
                    }
                    else {
                        service.name = listUpdate[i].name;
                        service.extra = listUpdate[i].extra;
                    }
                    const update = await this.serviceRepo.save(service);
                }
            }
            const newService = await this.serviceRepo
                .createQueryBuilder()
                .insert()
                .into(service_entity_1.Service)
                .values(listCreate)
                .execute();
            if (!newService) {
                return false;
            }
            return newService;
        }
        catch (err) {
            throw 'BACKEND';
        }
    }
    async createOneService(body) {
        try {
            const { pid, name, pm2, manual, extra, monit, id_server } = body;
            const checkServer = await this.serverRepo.findOne({
                where: { id: id_server },
            });
            if (!checkServer) {
                throw 'SERVER_NOT_FOUND';
            }
            const tracking = new Date(Date.now()) / 1000;
            const newService = this.serviceRepo.create({
                name,
                pm2: JSON.parse(pm2),
                extra,
                tracking,
                id_server: checkServer.id,
                type_server: checkServer.type,
                ip: checkServer.ip,
                server: id_server,
            });
            const saveService = await this.serviceRepo.save(newService);
            if (!newService || !saveService) {
                throw 'BACKEND';
            }
            return newService;
        }
        catch (err) {
            throw err;
        }
    }
    async listSearchService(query) {
        try {
            let { keyword, perPage = 1000, page = 1 } = query;
            const sercives = await this.serviceRepo.findAndCount({
                skip: (page - 1) * perPage,
                take: perPage,
                where: [
                    {
                        pid: keyword ? (0, typeorm_2.Like)(`%${keyword}%`) : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                    },
                    {
                        name: keyword ? (0, typeorm_2.Like)(`%${keyword}%`) : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                    },
                    {
                        pm2: keyword ? (0, typeorm_2.Like)(`%${keyword}%`) : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                    },
                ],
            });
            return {
                list: sercives[0],
                total: sercives[1],
                perPage: parseInt(perPage),
                current_page: parseInt(page),
            };
        }
        catch (e) {
            throw e;
        }
    }
    async listService(query) {
        try {
            let { page = 1, perPage = 10, status, type } = query;
            const sercives = await this.serviceRepo.findAndCount({
                skip: (page - 1) * perPage,
                take: perPage,
                where: [
                    {
                        type: type ? type : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                        pm2: status ? (0, typeorm_2.Like)(`%${status}%`) : (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                    },
                ],
            });
            return {
                list: sercives[0],
                total: sercives[1],
                perPage: parseInt(perPage),
                current_page: parseInt(page),
            };
        }
        catch (e) {
            throw e;
        }
    }
    async detailService(id) {
        try {
            const detail = await this.serviceRepo.findOne({
                where: { id },
            });
            if (!detail) {
                throw code_1.default.SERVICE_NOT_FOUND.type;
            }
            return detail;
        }
        catch (err) {
            throw err;
        }
    }
    async update(id, body) {
        const tracking = new Date(Date.now()) / 1000;
        try {
            const { pid, name, pm2, extra, manual, monit } = body;
            const service = await this.serviceRepo.findOne({
                where: { id },
            });
            if (!service) {
                throw code_1.default.SERVICE_NOT_FOUND.type;
            }
            service.pid = pid;
            service.name = name;
            service.extra = extra;
            service.pm2 = JSON.parse(pm2);
            service.manual = manual;
            service.monit = monit;
            service.tracking = tracking;
            const saveUpdate = await this.serviceRepo.save(service);
            return saveUpdate;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteService(id) {
        try {
            const service = await this.serviceRepo.findOne({
                where: { id },
            });
            if (!service) {
                throw 'SERVICE_NOT_FOUND';
            }
            const remove = await this.serviceRepo.remove(service);
            return remove;
        }
        catch (err) {
            throw err;
        }
    }
    async deleteMutipleService(id) {
        try {
            const removeService = await this.serviceRepo
                .createQueryBuilder()
                .delete()
                .from(service_entity_1.Service)
                .where('serverId IN (:...id)', { id: [id, null] })
                .execute();
            return true;
        }
        catch (err) {
            throw err;
        }
    }
};
ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(service_entity_1.Service)),
    __param(1, (0, typeorm_1.InjectRepository)(server_entity_1.Server)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ServicesService);
exports.ServicesService = ServicesService;
//# sourceMappingURL=services.service.js.map