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
exports.TransactionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const transaction_service_1 = require("./transaction.service");
const auth_decorator_1 = require("../../decorators/auth.decorator");
const send_response_1 = require("../../utils/send-response");
const code_1 = require("../../configs/code");
const query_list_dto_1 = require("../../global/dto/query-list.dto");
const jwt_guard_1 = require("../../guard/jwt.guard");
let TransactionController = class TransactionController {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async getAllTransaction(query) {
        try {
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async getTransactionByUser(user, query) {
        try {
            if (!user) {
                throw code_1.default.USER_NOT_FOUND.type;
            }
            const email = user.email;
            query.page = !query.page ? 1 : query.page;
            query.perPage = !query.perPage ? 10 : query.perPage;
            query.sort ? query.sort.toUpperCase() : 'DESC';
            const transaction = await this.transactionService.getTransactionByUser(email, query);
            const pagi = (transaction.count / query.perPage) | 0;
            const pages = transaction.count % query.perPage == 0 ? pagi : pagi + 1;
            const page = +query.page;
            const total = transaction.count;
            return send_response_1.SendResponse.success({
                page,
                pages,
                total,
                listTransaction: transaction.list,
            }, 'Get list transaction success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async getOneTransaction(id) {
        try {
            const transaction = await this.transactionService.getDetailTransaction(id);
            return send_response_1.SendResponse.success(transaction, 'Get details transaction success!');
        }
        catch (error) {
            return send_response_1.SendResponse.error(error);
        }
    }
    async sendMoneyToUser() {
    }
    async sendMoneyToExchanges() {
    }
};
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_list_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getAllTransaction", null);
__decorate([
    (0, common_1.Get)('by-user'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, auth_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_list_dto_1.QueryListDto]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getTransactionByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "getOneTransaction", null);
__decorate([
    (0, common_1.Post)('send-money-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "sendMoneyToUser", null);
__decorate([
    (0, common_1.Post)('send-money-exchanges'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TransactionController.prototype, "sendMoneyToExchanges", null);
TransactionController = __decorate([
    (0, swagger_1.ApiTags)('Transaction'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService])
], TransactionController);
exports.TransactionController = TransactionController;
//# sourceMappingURL=transaction.controller.js.map