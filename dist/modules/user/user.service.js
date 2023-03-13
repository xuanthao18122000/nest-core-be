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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../database/entities/user.entity");
const typeorm_2 = require("typeorm");
const datasource_1 = require("../../configs/datasource");
const provider_1 = require("../../utils/provider");
const role_service_1 = require("../role/role.service");
const code_1 = require("../../configs/code");
const nodemailer_1 = require("nodemailer");
let UserService = class UserService {
    constructor(userRepo, roleService) {
        this.userRepo = userRepo;
        this.roleService = roleService;
    }
    async findUserByEmail(email) {
        const user = await this.userRepo.findOne({
            where: { email: email },
            relations: {
                role: true,
            },
        });
        return user;
    }
    static async StaticFindUserById(UserId) {
        try {
            const userRepository = datasource_1.appDataSource.getRepository(user_entity_1.User);
            return await userRepository
                .createQueryBuilder('users')
                .leftJoinAndSelect('users.role', 'roles')
                .where('users.id = :id', { id: UserId.id })
                .getOne();
        }
        catch (e) {
            throw 'BACKEND';
        }
    }
    async findUserById(id) {
        const user = this.userRepo.findOne({
            where: { id },
        });
        if (user) {
            return user;
        }
        else {
            throw 'USER_NOT_FOUND';
        }
    }
    async registerUser(user) {
        try {
            const findUserAdmin = await this.userRepo.find();
            let findRole;
            if (findUserAdmin.length === 0) {
                findRole = await this.roleService.findRole("ADMIN");
            }
            else {
                findRole = await this.roleService.findRole("USER");
            }
            const { email, password, phone, fullName, code } = user;
            const address_wallet = '0x0' + this.generateRandomString(39);
            const checkUser = await this.userRepo.findOne({ where: { email } });
            if (checkUser) {
                throw 'EMAIL_EXISTED';
            }
            const newUser = await this.userRepo.create({
                email,
                password: provider_1.UtilsProvider.generateHash(password),
                phone,
                fullName,
                code,
                address_wallet,
                balance: 0,
                role: [findRole],
            });
            const saveUser = await this.userRepo.save(newUser);
            if (saveUser) {
                return saveUser;
            }
            else {
                throw 'BACKEND';
            }
        }
        catch (e) {
            throw e;
        }
    }
    generateRandomString(myLength) {
        const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
        const randomArray = Array.from({ length: myLength }, (v, k) => chars[Math.floor(Math.random() * chars.length)]);
        const randomString = randomArray.join("");
        return randomString;
    }
    ;
    async getAllUser(query) {
        try {
            const { keyword, page, perPage, sort } = query;
            const users = await this.userRepo.findAndCount({
                select: {
                    id: true,
                    fullName: true,
                    address_wallet: true,
                    balance: true,
                    email: true,
                    phone: true,
                    created_at: true,
                },
                skip: (page - 1) * perPage,
                take: perPage,
                order: { id: sort },
            });
            return { list: users[0], count: users[1] };
        }
        catch (error) {
            throw error;
        }
    }
    async getOneUser(id) {
        try {
            const user = await this.userRepo.findOne({
                where: { id }
            });
            if (!user) {
                throw code_1.default.USER_NOT_FOUND.type;
            }
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(id, body) {
        try {
            const { currentPassword, password } = body;
            const user = await this.userRepo.findOne({
                where: { id }
            });
            if (!user) {
                throw code_1.default.USER_NOT_FOUND.type;
            }
            if (user.password !== currentPassword) {
                throw code_1.default.WRONG_PASSWORD.type;
            }
            const hashPassword = provider_1.UtilsProvider.generateHash(password);
            user.password = hashPassword;
            return await this.userRepo.save(user);
        }
        catch (error) {
            throw error;
        }
    }
    async forgotPassword(email) {
        try {
            const user = await this.userRepo.findOne({
                where: { email }
            });
            if (!user) {
                throw code_1.default.USER_NOT_FOUND.type;
            }
            const random6number = Math.floor(100000 + Math.random() * 900000);
            const newPassword = 'PW' + random6number;
            const result = await this.sendEmail(email);
            if (!result) {
                throw 'BACKEND';
            }
            user.password = provider_1.UtilsProvider.generateHash(newPassword);
            return await this.userRepo.save(user);
        }
        catch (error) {
            throw error;
        }
    }
    async sendEmail(email) {
        try {
            const transporter = nodemailer_1.default.createTransport({
                host: process.env.MAIL_HOST,
                port: 587,
                secure: false,
                auth: {
                    user: process.env.MAIL_USERNAME,
                    pass: process.env.MAIL_PASSWORD,
                },
            });
            const message = {
                from: process.env.MAIL_USERNAME,
                to: email,
                subject: 'Test mail',
                html: 'ABC',
            };
            if (message) {
                return true;
            }
            return false;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const user = await this.userRepo.findOne({
                where: { id }
            });
            if (!user) {
                throw code_1.default.USER_NOT_FOUND.type;
            }
            user.delete_at = new Date();
            return await this.userRepo.save(user);
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        role_service_1.RoleService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map