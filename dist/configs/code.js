"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const code = {
    BACKEND: { code: 500, type: 'ERROR_BACKEND' },
    NOT_FOUND: { code: 404, type: 'NOT_FOUND' },
    UNAUTHORIZED: { code: 401, type: 'UNAUTHORIZED' },
    FORBIDDEN: { code: 403, type: 'FORBIDDEN' },
    BAD_REQUEST: { code: 400, type: 'BAD_REQUEST' },
    LOGIN_ERROR: { code: 402, type: 'LOGIN_ERROR' },
    VALIDATION_ERROR: { code: 422, type: 'VALIDATION_ERROR' },
    USER_NOT_FOUND: { code: 1001, type: 'USER_NOT_FOUND' },
    WRONG_PASSWORD: { code: 1002, type: 'WRONG_PASSWORD' },
    USER_UNACTIVED: { code: 1003, type: 'USER_UNACTIVED' },
    TOKEN_ERROR: { code: 1004, type: 'TOKEN_ERROR' },
    USER_EXISTED: { code: 1005, type: 'USER_EXISTED' },
    EMAIL_EXISTED: { code: 1006, type: 'EMAIL_EXISTED' },
    TOKEN_EXPIRED: { code: 1007, type: 'TOKEN_EXPIRED' },
    SERVER_NOT_FOUND: { code: 1008, type: 'SERVER_NOT_FOUND' },
    SERVICE_NOT_FOUND: { code: 1010, type: 'SERVICE_NOT_FOUND' },
    PASSWORD_ERROR: { code: 1014, type: 'PASSWORD_ERROR' },
    RECOVERY_EXPIRED: { code: 1016, type: 'RECOVERY_EXPIRED' },
    IP_SERVER_EXISTED: { code: 1020, type: 'IP_SERVER_EXISTED' },
    NAME_SERVER_EXISTED: { code: 1021, type: 'NAME_SERVER_EXISTED' },
    PID_SERVICE_EXISTED: { code: 1022, type: 'PID_SERVICE_EXISTED' },
    ROLE_EXISTED: { code: 1021, type: 'ROLE_EXISTED' },
    EMAIL_NOT_EXIST: { code: 1041, type: 'EMAIL_NOT_EXIST' },
    ROLE_NOT_FOUND: { code: 1042, type: 'ROLE_NOT_FOUND' },
    ROLE_ORIGIN: { code: 1045, type: 'ROLE_ORIGIN' },
    DATE_TZ: { code: 1046, type: 'DATE_TZ' },
    BLOCKING: { code: 1057, type: 'BLOCKING' },
    EMPTY: { code: 1058, type: 'EMPTY' },
    USER_NOT_ALLOW: { code: 1070, type: 'USER_NOT_ALLOW' },
    UPDATE_SERVER_FAILED: { code: 1071, type: 'UPDATE_SERVER_FAILED' },
    DELETE_SERVER_FAILED: { code: 1072, type: 'DELETE_SERVER_FAILED' },
    RICE_NOT_FOUND: { code: 1101, type: 'RICE_NOT_FOUND' },
    NOTIFICATION_NOT_FOUND: { code: 1201, type: 'NOTIFICATION_NOT_FOUND' },
    TRANSACTION_NOT_FOUND: { code: 1301, type: 'TRANSACTION_NOT_FOUND' },
};
exports.default = code;
//# sourceMappingURL=code.js.map