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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const account_entity_1 = require("../../database/entities/account.entity");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("../user/user.service");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const common_2 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
let AuthService = AuthService_1 = class AuthService {
    constructor(accountRepo, usersService, jwtService) {
        this.accountRepo = accountRepo;
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = new common_2.Logger(AuthService_1.name);
    }
    async handleCron() {
        const currentlyDate = new Date();
        currentlyDate.setDate(currentlyDate.getDate() - 1);
        const timeExpired = new Date(currentlyDate).toLocaleString();
        const account = await this.accountRepo.find({
            where: {
                created_at: (0, typeorm_2.LessThan)(new Date(timeExpired)),
            },
        });
        if (account.length !== 0) {
            for (let i = 0; i < account.length; i++) {
                const deleteJunkToken = await this.accountRepo
                    .createQueryBuilder()
                    .delete()
                    .from(account_entity_1.Account)
                    .where(`id = :id`, { id: account[i].id })
                    .execute();
            }
        }
    }
    validateHash(password, hash) {
        if (!password || !hash) {
            return false;
        }
        return bcrypt.compareSync(password, hash);
    }
    async login(user) {
        const find_user = await this.usersService.findUserByEmail(user.email);
        if (!find_user) {
            throw 'USER_NOT_FOUND';
        }
        if (find_user && this.validateHash(user.password, find_user.password)) {
            return find_user;
        }
        else {
            throw 'WRONG_PASSWORD';
        }
    }
    async saveTokenToDB(account) {
        const { token, user_id } = account;
        try {
            const account = await this.accountRepo.create({
                token,
                user: user_id,
            });
            const saveToken = await this.accountRepo.save(account);
            if (saveToken) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async deleteToken(token) {
        try {
            const account = await this.accountRepo.findOne({
                where: { token: token },
            });
            if (!account) {
                throw 'UNAUTHORIZED';
            }
            const deleteStatus = await this.accountRepo.remove(account);
            return deleteStatus;
        }
        catch (err) {
            throw err;
        }
    }
    checkToken(account) {
        const { token, user_id } = account;
        try {
            this.accountRepo
                .findOne({
                where: { token: token },
            })
                .then((account) => {
                return account;
            })
                .catch((err) => {
                throw err;
            });
            if (!account) {
                throw 'UNAUTHORIZED';
            }
            return account;
        }
        catch (err) {
            throw err;
        }
    }
    async signTokenVerify(user) {
        return {
            accessToken: await this.jwtService.signAsync({
                id: user.id,
            }),
            expiresIn: process.env.ExpiresIn,
        };
    }
};
__decorate([
    (0, schedule_1.Cron)('0 30 11 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "handleCron", null);
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(account_entity_1.Account)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map