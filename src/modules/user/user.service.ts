import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterPostDTO } from '../auth/dto/index';
import { SendResponse } from 'src/utils/send-response';
import { appDataSource } from 'src/configs/datasource';
import { UtilsProvider } from 'src/utils/provider';
import { Role } from '../../database/entities/role.entity';
import {RoleService} from "../role/role.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
import code from "../../configs/code";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: {
        role: true,
      },
    });
    return user;
  }

  static async StaticFindUserById(UserId) {
    try {
      const userRepository = appDataSource.getRepository(User);

      return await userRepository
        .createQueryBuilder('users')
        .leftJoinAndSelect('users.role', 'roles')
        .where('users.id = :id', { id: UserId.id })
        .getOne();
    } catch (e) {
      throw 'BACKEND';
    }
  }

  async findUserById(id: number): Promise<User> {
    const user = this.userRepo.findOne({
      where: { id },
    });
    if (user) {
      return user;
    } else {
      throw 'USER_NOT_FOUND';
    }
  }

  async registerUser(user: RegisterPostDTO) {
    try {
      const findUserAdmin = await this.userRepo.find();
      let findRole;
      if(findUserAdmin.length === 0){
        findRole = await this.roleService.findRole("ADMIN");
      }else{
        findRole = await this.roleService.findRole("USER");
      }

      const { email, password, phone, fullName } = user;
      const checkUser = await this.userRepo.findOne({ where: { email } });
      if (checkUser) {
        throw 'EMAIL_EXISTED';
      }
      const newUser = await this.userRepo.create({
        email,
        password: UtilsProvider.generateHash(password),
        phone,
        fullName,
        role: [findRole],
      });
      const saveUser = await this.userRepo.save(newUser);
      if (saveUser) {
        return saveUser;
      } else {
        throw 'BACKEND';
      }
    } catch (e) {
      throw e;
    }
  }

  async getAllUser(query: QueryListDto) {
    try{
      const { keyword, page, perPage, sort } = query;
      const users = await this.userRepo.findAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        order: { id: sort as SORT },
      })
      return { list: users[0], count: users[1] };
    }catch (error) {
      throw error;
    }
  }

  async getOneUser(id: number) {
    try{
      const user = await this.userRepo.findOne({
        where: { id }
      })

      if(!user){
        throw code.USER_NOT_FOUND.type;
      }
      return user;
    }catch (error) {
      throw error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
