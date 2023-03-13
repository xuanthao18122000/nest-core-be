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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const query_list_dto_1 = require("../../global/dto/query-list.dto");
const notification_service_1 = require("./notification.service");
const send_response_1 = require("../../utils/send-response");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getAllNotification(query) {
        try {
            query.perPage = !query.perPage ? 10 : query.perPage;
            query.page = !query.page ? 1 : query.page;
            query.sort ? query.sort.toUpperCase() : 'DESC';
            const listNotification = await this.notificationService.getAllNotification(query);
            const pagi = (listNotification.count / query.perPage) | 0;
            const pages = listNotification.count % query.perPage == 0 ? pagi : pagi + 1;
            const page = +query.page;
            const total = listNotification.count;
            return send_response_1.SendResponse.success({
                page,
                pages,
                total,
                listNotification: listNotification.list,
            }, 'Get list notification success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async getOneNotification(id) {
        try {
            const notification = await this.notificationService.getOneNotification(id);
            return send_response_1.SendResponse.success(notification, 'Get details notification success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async readNotification(id) {
        try {
            const result = await this.notificationService.readNotification(id);
            if (!result) {
                throw 'BACKEND';
            }
            return send_response_1.SendResponse.success([], 'Read details notification success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_list_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getAllNotification", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getOneNotification", null);
__decorate([
    (0, common_1.Get)('read/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "readNotification", null);
NotificationController = __decorate([
    (0, swagger_1.ApiTags)('Notification'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map