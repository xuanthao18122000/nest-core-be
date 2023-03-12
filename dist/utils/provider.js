"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsProvider = void 0;
const bcrypt = require("bcrypt");
const lodash = require("lodash");
class UtilsProvider {
    static parseJwt(token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64)
                .split('')
                .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
                .join(''));
            return JSON.parse(jsonPayload);
        }
        catch (_a) {
            throw 'BLOCKING';
        }
    }
    static getErrorList(validationErrors, errors) {
        for (const e of validationErrors) {
            if (e.children) {
                errors = UtilsProvider.getErrorList(e.children, errors);
            }
            if (!e.constraints)
                continue;
            const error = {
                property: e.property,
                rule: undefined,
                msg: undefined,
            };
            const rule = lodash.last(Object.keys(e.constraints));
            if (rule == 'isEmail') {
                error.rule = 'email';
            }
            else if (rule == 'isNotEmpty') {
                error.rule = 'required';
            }
            else if (rule == 'isNumber' || rule == 'isNumberString') {
                error.rule = 'number';
            }
            else if (rule.indexOf('is') === 0) {
                error.rule = rule.replace('is', '').toLowerCase();
            }
            else {
                error.rule = rule;
            }
            errors.push(error);
        }
        return errors;
    }
    static generateHash(password) {
        return bcrypt.hashSync(password, 12);
    }
    static validateHash(password, hash) {
        if (!password || !hash) {
            return false;
        }
        return bcrypt.compareSync(password, hash);
    }
    static randomNumber(length) {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static randomString(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
}
exports.UtilsProvider = UtilsProvider;
//# sourceMappingURL=provider.js.map