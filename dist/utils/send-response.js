"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendResponse = void 0;
const code_1 = require("../configs/code");
const error_payload_dto_1 = require("./dto/error_payload.dto");
class SendResponse {
    static success(data, msg = '') {
        const result = {
            code: 0,
            success: true,
            data: data,
            msg: msg,
        };
        return result;
    }
    static error(error) {
        if (typeof error === 'string') {
            if (code_1.default.hasOwnProperty(error)) {
                return new error_payload_dto_1.ErrorPayloadDto({
                    code: code_1.default[error].code,
                    success: false,
                    msg: error,
                });
            }
        }
        if (typeof error === 'object') {
            let msg = null;
            for (const e in code_1.default) {
                if (code_1.default[e].code === error['code']) {
                    msg = e;
                    break;
                }
            }
            return new error_payload_dto_1.ErrorPayloadDto({
                code: error['code'],
                success: false,
                msg: error['msg'],
            });
        }
        return new error_payload_dto_1.ErrorPayloadDto({
            code: code_1.default.BACKEND.code,
            success: false,
            msg: 'BACKEND',
        });
    }
    static message_error(error) {
        if (typeof error === 'string') {
            if (code_1.default.hasOwnProperty(error)) {
                return new error_payload_dto_1.ErrorPayloadDto({
                    code: code_1.default[error].code,
                    success: false,
                    msg: error,
                });
            }
        }
        if (typeof error === 'object') {
            let msg = null;
            for (const e in code_1.default) {
                if (code_1.default[e].code === error['code']) {
                    msg = e;
                    break;
                }
            }
            return new error_payload_dto_1.ErrorPayloadDto({
                code: error['code'],
                success: false,
                msg,
            });
        }
        return new error_payload_dto_1.ErrorPayloadDto({
            code: code_1.default.BACKEND.code,
            success: false,
            msg: 'BACKEND',
        });
    }
}
exports.SendResponse = SendResponse;
//# sourceMappingURL=send-response.js.map