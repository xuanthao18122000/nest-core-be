import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { UserService } from '../user/user.service';
import { SendResponse } from '../../utils/send-response';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.ExpiresIn },
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userService.findUserById(payload.id);

      if (!user) {
        return SendResponse.error('UNAUTHORIZED');
      }
      return user;
    } catch (e) {
      return SendResponse.error(e);
    }
  }
}
