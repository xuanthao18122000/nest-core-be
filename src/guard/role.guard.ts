import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { includes, isArray, isEmpty } from 'lodash';
import { SendResponse } from 'src/utils/send-response';
import { UserService } from '../modules/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        const request = context.switchToHttp().getRequest();

        const user = await UserService.StaticFindUserById(request.user);
        if (!user)
            throw new HttpException(
                SendResponse.error('FORBIDDEN'),
                HttpStatus.FORBIDDEN,
            );
        const rolesUser = user.role.map((o) => o.role_key);

        for (const role of roles) {
            if (includes(rolesUser, role)) return true;
        }
        throw new HttpException(
            SendResponse.error('FORBIDDEN'),
            HttpStatus.FORBIDDEN,
        );
    }
}
