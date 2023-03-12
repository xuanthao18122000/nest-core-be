import { ErrorPayloadDto } from './dto/error_payload.dto';
export declare class SendResponse {
    static success(data: any, msg?: string): {
        code: number;
        success: boolean;
        data: any;
        msg: string;
    };
    static error(error: object | string): ErrorPayloadDto;
    static message_error(error: object | string): ErrorPayloadDto;
}
