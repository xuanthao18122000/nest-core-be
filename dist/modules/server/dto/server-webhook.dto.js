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
exports.ServerWebhookDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const service_webhook_dto_1 = require("../../services/dto/service-webhook.dto");
const class_validator_1 = require("class-validator");
let ServerWebhookDto = class ServerWebhookDto {
};
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(30),
    (0, swagger_1.ApiProperty)({ example: 'ip' }),
    __metadata("design:type", String)
], ServerWebhookDto.prototype, "ip", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'memory' }),
    __metadata("design:type", Number)
], ServerWebhookDto.prototype, "memory", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'used' }),
    __metadata("design:type", Number)
], ServerWebhookDto.prototype, "used", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'cpu' }),
    __metadata("design:type", Number)
], ServerWebhookDto.prototype, "cpu", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'cpus' }),
    __metadata("design:type", Number)
], ServerWebhookDto.prototype, "cpus", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ example: 'uptime' }),
    __metadata("design:type", Number)
], ServerWebhookDto.prototype, "uptime", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(150),
    (0, swagger_1.ApiProperty)({ example: 'platform' }),
    __metadata("design:type", String)
], ServerWebhookDto.prototype, "platform", void 0);
__decorate([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        type: 'array',
        items: { $ref: (0, swagger_1.getSchemaPath)(service_webhook_dto_1.serviceWebhookDto) },
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => service_webhook_dto_1.serviceWebhookDto),
    __metadata("design:type", Array)
], ServerWebhookDto.prototype, "services", void 0);
ServerWebhookDto = __decorate([
    (0, swagger_1.ApiExtraModels)(service_webhook_dto_1.serviceWebhookDto)
], ServerWebhookDto);
exports.ServerWebhookDto = ServerWebhookDto;
//# sourceMappingURL=server-webhook.dto.js.map