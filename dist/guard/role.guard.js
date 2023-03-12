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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const lodash_1 = require("lodash");
const send_response_1 = require("../utils/send-response");
const user_service_1 = require("../modules/user/user.service");
let RolesGuard = class RolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();
        const user = await user_service_1.UserService.StaticFindUserById(request.user);
        if (!user)
            throw new common_1.HttpException(send_response_1.SendResponse.error('FORBIDDEN'), common_1.HttpStatus.FORBIDDEN);
        const rolesUser = user.role.map((o) => o.role_key);
        for (const role of roles) {
            if ((0, lodash_1.includes)(rolesUser, role))
                return true;
        }
        throw new common_1.HttpException(send_response_1.SendResponse.error('FORBIDDEN'), common_1.HttpStatus.FORBIDDEN);
    }
};
RolesGuard = __decorate([
    (0, common_2.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=role.guard.js.map