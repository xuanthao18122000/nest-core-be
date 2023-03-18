import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SendResponse } from 'src/utils/send-response';
import { AuthService } from '../modules/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../database/entities/account.entity';
import { Repository } from 'typeorm';
import { Request } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {
    super();
  }
  // @ts-ignore
  async handleRequest(
    err: any,
    user: any,
    info: any,
    context: any,
    status: any,
  ) {
    if (context.getRequest().headers.authorization) {
      const bearToken = context.getRequest().headers.authorization;
      const splitToken = bearToken.split('Bearer ');
      const token = splitToken[1];
      const account = await this.accountRepo.findOne({
        where: {
          token,
        },
      });

      if (user && account) {
        return user;
      } else {
        throw new UnauthorizedException(SendResponse.error('UNAUTHORIZED'));
      }
    } else {
      throw new UnauthorizedException(SendResponse.error('UNAUTHORIZED'));
    }

    if (!user) {
      throw new UnauthorizedException(SendResponse.error('UNAUTHORIZED'));
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
