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
exports.CreateServiceDto = exports.listServiceUpdateDto = exports.listServiceCreateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
let listServiceCreateDto = class listServiceCreateDto {
    constructor(init) {
        Object.assign(this, init);
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'pid' }),
    __metadata("design:type", Number)
], listServiceCreateDto.prototype, "pid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'name' }),
    __metadata("design:type", String)
], listServiceCreateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: 'extra' }),
    __metadata("design:type", String)
], listServiceCreateDto.prototype, "extra", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: '{object}' }),
    __metadata("design:type", Object)
], listServiceCreateDto.prototype, "pm2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'manual' }),
    __metadata("design:type", String)
], listServiceCreateDto.prototype, "manual", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '{object}' }),
    __metadata("design:type", Object)
], listServiceCreateDto.prototype, "monit", void 0);
listServiceCreateDto = __decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:paramtypes", [Object])
], listServiceCreateDto);
exports.listServiceCreateDto = listServiceCreateDto;
let listServiceUpdateDto = class listServiceUpdateDto {
    constructor(init) {
        Object.assign(this, init);
    }
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ example: 'empty: create server' }),
    __metadata("design:type", Number)
], listServiceUpdateDto.prototype, "id", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, swagger_1.ApiProperty)({ example: 'pid', required: false }),
    __metadata("design:type", Number)
], listServiceUpdateDto.prototype, "pid", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'name' }),
    __metadata("design:type", String)
], listServiceUpdateDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    (0, swagger_1.ApiProperty)({ example: 'extra' }),
    __metadata("design:type", String)
], listServiceUpdateDto.prototype, "extra", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiProperty)({ example: '{object}' }),
    __metadata("design:type", Object)
], listServiceUpdateDto.prototype, "pm2", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'manual', required: false }),
    __metadata("design:type", String)
], listServiceUpdateDto.prototype, "manual", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsObject)(),
    (0, swagger_1.ApiProperty)({ example: '{object}' }),
    __metadata("design:type", Object)
], listServiceUpdateDto.prototype, "monit", void 0);
listServiceUpdateDto = __decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:paramtypes", [Object])
], listServiceUpdateDto);
exports.listServiceUpdateDto = listServiceUpdateDto;
class CreateServiceDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    (0, swagger_1.ApiProperty)({ example: 'name' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'pm2' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "pm2", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ example: 'extra' }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "extra", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'id_server' }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "id_server", void 0);
exports.CreateServiceDto = CreateServiceDto;
//# sourceMappingURL=create-service.dto.js.map