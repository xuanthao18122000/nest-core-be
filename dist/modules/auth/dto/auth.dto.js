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
exports.ForgotPasswordDTO = exports.ChangePasswordDTO = exports.RegisterPostDTO = exports.LoginPostDTO = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class LoginPostDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Email' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginPostDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MD5 Hash' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginPostDTO.prototype, "password", void 0);
exports.LoginPostDTO = LoginPostDTO;
class RegisterPostDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'email' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterPostDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MD5 hash' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterPostDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fullName' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterPostDTO.prototype, "fullName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'phone' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RegisterPostDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'code (6 numbers)' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], RegisterPostDTO.prototype, "code", void 0);
exports.RegisterPostDTO = RegisterPostDTO;
class ChangePasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MD5 Hash' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "currentPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MD5 Hash' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ChangePasswordDTO.prototype, "password", void 0);
exports.ChangePasswordDTO = ChangePasswordDTO;
class ForgotPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'email' }),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ForgotPasswordDTO.prototype, "email", void 0);
exports.ForgotPasswordDTO = ForgotPasswordDTO;
//# sourceMappingURL=auth.dto.js.map