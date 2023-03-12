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
exports.CreateServerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const create_service_dto_1 = require("../../services/dto/create-service.dto");
const class_validator_1 = require("class-validator");
let CreateServerDto = class CreateServerDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    (0, swagger_1.ApiProperty)({ example: 'ip' }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "ip", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    (0, swagger_1.ApiProperty)({ example: 'name' }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "name", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(200),
    (0, swagger_1.ApiProperty)({ example: 'description' }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(20),
    (0, swagger_1.ApiProperty)({ example: 'status' }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'memory' }),
    __metadata("design:type", Number)
], CreateServerDto.prototype, "memory", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'used' }),
    __metadata("design:type", Number)
], CreateServerDto.prototype, "used", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'cpu' }),
    __metadata("design:type", Number)
], CreateServerDto.prototype, "cpu", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'cpus' }),
    __metadata("design:type", Number)
], CreateServerDto.prototype, "cpus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'uptime' }),
    __metadata("design:type", Number)
], CreateServerDto.prototype, "uptime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    (0, swagger_1.ApiProperty)({ example: 'platform' }),
    __metadata("design:type", String)
], CreateServerDto.prototype, "platform", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => create_service_dto_1.listServiceCreateDto),
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: { $ref: (0, swagger_1.getSchemaPath)(create_service_dto_1.listServiceCreateDto) },
    }),
    __metadata("design:type", Array)
], CreateServerDto.prototype, "listService", void 0);
CreateServerDto = __decorate([
    (0, swagger_1.ApiExtraModels)(create_service_dto_1.listServiceCreateDto)
], CreateServerDto);
exports.CreateServerDto = CreateServerDto;
//# sourceMappingURL=create-server.dto.js.map