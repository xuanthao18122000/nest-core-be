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
exports.RiceService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../database/entities");
const typeorm_2 = require("typeorm");
const code_1 = require("../../configs/code");
let RiceService = class RiceService {
    constructor(riceRepo) {
        this.riceRepo = riceRepo;
    }
    async getAllRice(query) {
        try {
            const { keyword, page, perPage, sort } = query;
            const rice = await this.riceRepo.findAndCount({
                skip: (page - 1) * perPage,
                take: perPage,
                order: { id: sort },
            });
            return { list: rice[0], count: rice[1] };
        }
        catch (error) {
            throw error;
        }
    }
    async getOneRice(id) {
        try {
            const oneRice = await this.riceRepo.findOne({
                where: { id }
            });
            if (!oneRice) {
                throw code_1.default.RICE_NOT_FOUND.type;
            }
            return oneRice;
        }
        catch (error) {
            throw error;
        }
    }
};
RiceService = __decorate([
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.Rice)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RiceService);
exports.RiceService = RiceService;
//# sourceMappingURL=rice.service.js.map