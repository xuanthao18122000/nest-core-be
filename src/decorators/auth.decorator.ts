// get-user.decorator.ts
import {
    createParamDecorator,
    ExecutionContext,
    applyDecorators,
    HttpCode,
    SetMetadata,
    UseGuards,
} from '@nestjs/common';
import { extend } from 'lodash';
import { Request } from 'express';
import { ApiErrorResponse } from 'src/schema/api_error_response';
import code from 'src/configs/code';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RolesGuard } from 'src/guard/role.guard';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    return req.user;
  },
);

export function Auth(data?: {
    roles?: string[];
    loginAdmin?: boolean;
    withoutActive?: boolean;
}) {
    if (!data) data = {};
    data = extend(
        {},
        { roles: [], loginAdmin: false, withoutActive: true },
        data,
    );

    return applyDecorators(
        HttpCode(200),
        SetMetadata('roles', data.roles),
        SetMetadata('withoutActive', data.withoutActive),
        UseGuards(JwtAuthGuard, RolesGuard),
        ApiErrorResponse(code.UNAUTHORIZED),
        ApiErrorResponse(code.BACKEND),
        ApiErrorResponse(code.FORBIDDEN),
    );
}

