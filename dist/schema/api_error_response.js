"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const code_1 = require("../configs/code");
const lodash_1 = require("lodash");
const ApiErrorResponse = (error) => {
    if (!error)
        error = 'BAD_REQUEST';
    let _code = code_1.default.BACKEND.code;
    if (typeof error === 'string') {
        if (code_1.default.hasOwnProperty(error)) {
            _code = code_1.default[error].code;
        }
        else {
            _code = code_1.default.BACKEND.code;
        }
    }
    else if (typeof error === 'object') {
        _code = error['code'];
    }
    const properties = {
        code: { type: 'number', example: _code },
        success: { type: 'bool', example: false },
    };
    if (_code == code_1.default.VALIDATION_ERROR.code) {
        properties['errors'] = {
            type: 'array',
            items: {
                properties: {
                    property: { type: 'string', example: 'attribute' },
                    rule: { type: 'string', example: 'required', description: 'aabbc' },
                },
            },
        };
    }
    else {
        properties['msg'] = {
            type: 'string',
            default: error && error['type']
                ? (0, lodash_1.capitalize)((0, lodash_1.startCase)(error['type']))
                : 'string',
        };
    }
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({
        status: _code,
        schema: {
            properties,
        },
    }));
};
exports.ApiErrorResponse = ApiErrorResponse;
//# sourceMappingURL=api_error_response.js.map