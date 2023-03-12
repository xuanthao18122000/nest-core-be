"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const provider_1 = require("../utils/provider");
const error_payload_dto_1 = require("../utils/dto/error_payload.dto");
const code_1 = require("../configs/code");
const ValidationPipe = (options) => new common_1.ValidationPipe(Object.assign(Object.assign({}, options), { exceptionFactory(validationErrors) {
        let errors = [];
        errors = provider_1.UtilsProvider.getErrorList(validationErrors, errors);
        throw new common_1.UnprocessableEntityException(new error_payload_dto_1.ErrorPayloadDto({
            code: code_1.default.VALIDATION_ERROR.code,
            success: false,
            errors,
        }));
    } }));
exports.ValidationPipe = ValidationPipe;
//# sourceMappingURL=validation.pipe.js.map