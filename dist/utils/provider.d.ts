import { ValidationError } from 'class-validator';
export declare class UtilsProvider {
    static parseJwt(token: any): any;
    static getErrorList(validationErrors: ValidationError[], errors: any): any;
    static generateHash(password: string): string;
    static validateHash(password: string, hash: string): boolean;
    static randomNumber(length: any): string;
    static randomString(length: any): string;
}
