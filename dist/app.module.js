"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const database_module_1 = require("./database.module");
const core_1 = require("@nestjs/core");
const route_1 = require("./routes/route");
const user_module_1 = require("./modules/user/user.module");
const config_1 = require("@nestjs/config");
const role_module_1 = require("./modules/role/role.module");
const rice_module_1 = require("./modules/rice/rice.module");
const transaction_module_1 = require("./modules/transaction/transaction.module");
const notification_module_1 = require("./modules/notification/notification.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            core_1.RouterModule.register(route_1.Routes),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            rice_module_1.RiceModule,
            transaction_module_1.TransactionModule,
            notification_module_1.NotificationModule,
            user_module_1.UserModule,
            role_module_1.RoleModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map