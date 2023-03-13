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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const send_response_1 = require("../utils/send-response");
const typeorm_1 = require("@nestjs/typeorm");
const account_entity_1 = require("../database/entities/account.entity");
const typeorm_2 = require("typeorm");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(accountRepo) {
        super();
        this.accountRepo = accountRepo;
    }
    async handleRequest(err, user, info, context, status) {
        if (context.getRequest().headers.authorization) {
            const bearToken = context.getRequest().headers.authorization;
            console.log(bearToken);
            const splitToken = bearToken.split('Bearer ');
            const token = splitToken[1];
            const account = await this.accountRepo.findOne({
                where: {
                    token,
                },
            });
            console.log(account);
            if (user && account) {
                return user;
            }
            else {
                throw new common_1.UnauthorizedException(send_response_1.SendResponse.error('UNAUTHORIZED'));
            }
        }
        else {
            throw new common_1.UnauthorizedException(send_response_1.SendResponse.error('UNAUTHORIZED'));
        }
        if (!user) {
            throw new common_1.UnauthorizedException(send_response_1.SendResponse.error('UNAUTHORIZED'));
        }
        return super.handleRequest(err, user, info, context, status);
    }
};
JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], JwtAuthGuard);
exports.JwtAuthGuard = JwtAuthGuard;
//# sourceMappingURL=jwt.guard.js.map