"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const auth_module_1 = require("../modules/auth/auth.module");
const rice_module_1 = require("../modules/rice/rice.module");
const transaction_module_1 = require("../modules/transaction/transaction.module");
const notification_module_1 = require("../modules/notification/notification.module");
const user_module_1 = require("../modules/user/user.module");
exports.Routes = [
    {
        path: 'api',
        children: [
            {
                path: 'auth',
                module: auth_module_1.AuthModule,
            },
            {
                path: 'rice',
                module: rice_module_1.RiceModule,
            },
            {
                path: 'transaction',
                module: transaction_module_1.TransactionModule,
            },
            {
                path: 'notification',
                module: notification_module_1.NotificationModule,
            },
            {
                path: 'user',
                module: user_module_1.UserModule,
            }
        ],
    },
];
//# sourceMappingURL=route.js.map