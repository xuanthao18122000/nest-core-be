export declare class ErrorPayloadDto {
    code: number;
    msg: string;
    success: boolean;
    errors: object;
    constructor({ code, success, msg, errors }: {
        code?: number;
        success?: boolean;
        msg?: string;
        errors?: any[];
    });
}
