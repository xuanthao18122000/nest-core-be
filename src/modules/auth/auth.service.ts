import { Injectable } from '@nestjs/common';
import { LoginPostDTO, RegisterPostDTO } from './dto';
import { User } from '../../database/entities/user.entity';
import { Account } from '../../database/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { MoreThan, LessThan, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { SendResponse } from '../../utils/send-response';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UtilsProvider } from '../../utils/provider';
import {RoleService} from "../role/role.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  // @Cron('01 * * * * *')
  @Cron('0 30 11 * * *')
  async handleCron() {
    const currentlyDate = new Date();
    currentlyDate.setDate(currentlyDate.getDate() - 1);
    const timeExpired = new Date(currentlyDate).toLocaleString();
    const account = await this.accountRepo.find({
      where: {
        created_at: LessThan(new Date(timeExpired)),
      },
    });
    if (account.length !== 0) {
      for (let i = 0; i < account.length; i++) {
        const deleteJunkToken = await this.accountRepo
          .createQueryBuilder()
          .delete()
          .from(Account)
          .where(`id = :id`, { id: account[i].id })
          .execute();
      }
    }
  }

  validateHash(password: string, hash: string): boolean {
    if (!password || !hash) {
      return false;
    }
    return bcrypt.compareSync(password, hash);
  }

  async login(user: LoginPostDTO) {
    const find_user = await this.usersService.findUserByEmail(user.email);
    if (!find_user) {
      throw 'USER_NOT_FOUND';
    }
    if (find_user && this.validateHash(user.password, find_user.password)) {
      return find_user;
    } else {
      throw 'WRONG_PASSWORD';
    }
  }

  //Function save token when user login
  async saveTokenToDB(account) {
    const { token, user_id } = account;
    try {
      const account = await this.accountRepo.create({
        token,
        user: user_id,
      });
      const saveToken = await this.accountRepo.save(account);
      if (saveToken) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteToken(token) {
    try {
      const account = await this.accountRepo.findOne({
        where: { token: token },
      });
      if (!account) {
        throw 'UNAUTHORIZED';
      }
      const deleteStatus = await this.accountRepo.remove(account);
      return deleteStatus;
    } catch (err) {
      throw err;
    }
  }

  checkToken(account) {
    const { token, user_id } = account;
    try {
      this.accountRepo
        .findOne({
          where: { token: token },
        })
        .then((account) => {
          return account;
        })
        .catch((err) => {
          throw err;
        });

      if (!account) {
        throw 'UNAUTHORIZED';
      }
      return account;
    } catch (err) {
      throw err;
    }
  }

  async signTokenVerify(user: User) {
    return {
      accessToken: await this.jwtService.signAsync({
        id: user.id,
      }),
      expiresIn: process.env.ExpiresIn,
    };
  }
}
