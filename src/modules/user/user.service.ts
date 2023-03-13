import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import {ChangePasswordDTO, ForgotPasswordDTO, RegisterPostDTO} from '../auth/dto/index';
import { SendResponse } from 'src/utils/send-response';
import { appDataSource } from 'src/configs/datasource';
import { UtilsProvider } from 'src/utils/provider';
import { Role } from '../../database/entities/role.entity';
import {RoleService} from "../role/role.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
import code from "../../configs/code";
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';

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

      const { email, password, phone, fullName, code } = user;
      const address_wallet = '0x0' + this.generateRandomString( 39);
      const checkUser = await this.userRepo.findOne({ where: { email } });
      if (checkUser) {
        throw 'EMAIL_EXISTED';
      }
      const newUser = await this.userRepo.create({
        email,
        password: UtilsProvider.generateHash(password),
        phone,
        fullName,
        code,
        address_wallet,
        balance: 0,
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

  generateRandomString(myLength) {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
  };

  async getAllUser(query: QueryListDto) {
    try{
      const { keyword, page, perPage, sort } = query;
      const users = await this.userRepo.findAndCount({
        select: {
          id: true,
          fullName: true,
          address_wallet: true,
          balance: true,
          email: true,
          phone: true,
          created_at: true,
        },
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

  async changePassword(id: number, body: ChangePasswordDTO): Promise<User> {
    try{
      const { currentPassword, password } = body;
      const user = await this.userRepo.findOne({
        where: { id }
      })

      if(!user){
        throw code.USER_NOT_FOUND.type;
      }
      if(user.password !== currentPassword){
        throw code.WRONG_PASSWORD.type;
      }

      const hashPassword = UtilsProvider.generateHash(password);
      user.password = hashPassword;
      return await this.userRepo.save(user);
    }catch (error) {
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<User> {
    try{
      const user = await this.userRepo.findOne({
        where: { email }
      })

      if(!user){
        throw code.USER_NOT_FOUND.type;
      }

      const random6number = Math.floor(100000 + Math.random() * 900000)
      const newPassword = 'PW' + random6number;

      //Send mail
      const result = await this.sendEmail(email);
      if(!result){
        throw 'BACKEND';
      }

      user.password = UtilsProvider.generateHash(newPassword);
      return await this.userRepo.save(user);
    }catch (error) {
      throw error;
    }
  }

  async sendEmail(email: string){
    try{
      //create a nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
      })

      // create a nodemailer message
      const message = {
        from: process.env.MAIL_USERNAME, // replace with your email address
        to: email,
        subject: 'Test mail',
        html: 'ABC',
      };

      if(message) {
        return true;
      }
      return false;
    }catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number): Promise<User> {
    try{
      const user = await this.userRepo.findOne({
        where: { id }
      })

      if(!user){
        throw code.USER_NOT_FOUND.type;
      }

      user.delete_at = new Date();
      return await this.userRepo.save(user);
    }catch (error) {
      throw error;
    }
  }
}
