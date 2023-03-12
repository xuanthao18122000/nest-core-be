"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const api_error_response_1 = require("../schema/api_error_response");
const code_1 = require("../configs/code");
const jwt_guard_1 = require("../guard/jwt.guard");
const role_guard_1 = require("../guard/role.guard");
exports.GetUser = (0, common_1.createParamDecorator)((data, context) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
});
function Auth(data) {
    if (!data)
        data = {};
    data = (0, lodash_1.extend)({}, { roles: [], loginAdmin: false, withoutActive: true }, data);
    return (0, common_1.applyDecorators)((0, common_1.HttpCode)(200), (0, common_1.SetMetadata)('roles', data.roles), (0, common_1.SetMetadata)('withoutActive', data.withoutActive), (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard, role_guard_1.RolesGuard), (0, api_error_response_1.ApiErrorResponse)(code_1.default.UNAUTHORIZED), (0, api_error_response_1.ApiErrorResponse)(code_1.default.BACKEND), (0, api_error_response_1.ApiErrorResponse)(code_1.default.FORBIDDEN));
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map