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
exports.UserRice = exports.User = void 0;
const typeorm_1 = require("typeorm");
const account_entity_1 = require("./account.entity");
const notification_entity_1 = require("./notification.entity");
const role_entity_1 = require("./role.entity");
const transaction_entity_1 = require("./transaction.entity");
const rice_entity_1 = require("./rice.entity");
const class_validator_1 = require("class-validator");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 30, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "address_wallet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double' }),
    __metadata("design:type", Number)
], User.prototype, "balance", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], User.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], User.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], User.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => account_entity_1.Account, (account) => account.user, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], User.prototype, "accounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.Notification, (notification) => notification.user, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => transaction_entity_1.Transaction, (transaction) => transaction.user, {
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", Array)
], User.prototype, "transactions", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => role_entity_1.Role, (role) => role.user),
    (0, typeorm_1.JoinTable)({
        name: 'role_user',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'role_id',
            referencedColumnName: 'role_id',
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => rice_entity_1.Rice, (rice) => rice.users),
    (0, typeorm_1.JoinTable)({
        name: 'rice_user',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'rice_id',
            referencedColumnName: 'id',
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "rice", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
let UserRice = class UserRice {
};
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], UserRice.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], UserRice.prototype, "rice_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], UserRice.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], UserRice.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], UserRice.prototype, "updated_at", void 0);
UserRice = __decorate([
    (0, typeorm_1.Entity)('rice_user')
], UserRice);
exports.UserRice = UserRice;
//# sourceMappingURL=user.entity.js.map