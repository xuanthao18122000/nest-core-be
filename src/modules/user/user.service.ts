import {Inject, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {User, UserRice} from 'src/database/entities/user.entity';
import {DataSource, Repository} from 'typeorm';
import {ChangePasswordDTO, ForgotPasswordDTO, RegisterPostDTO} from '../auth/dto/index';
import { appDataSource } from 'src/configs/datasource';
import { UtilsProvider } from 'src/utils/provider';
import {RoleService} from "../role/role.service";
import { QueryListDto } from "../../global/dto/query-list.dto";
import code from "../../configs/code";
import { TransactionFor } from 'nest-transact';
import { MailerService } from "@nestjs-modules/mailer";
import * as md5 from 'md5';
import * as bcrypt from "bcrypt";
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class UserService   {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserRice)
    private readonly userRiceRepo: Repository<UserRice>,
    private readonly roleService: RoleService,
    private mailerService: MailerService,
    private readonly dataSource: DataSource,
  ) {
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email: email },
      relations: {
        role: true,
      },
    });
    return user;
  }

  async findAdmin(): Promise<User> {
    try{
      const user = await this.userRepo.findOne({
        where: {role: {
          role_key: 'ADMIN',
          }}
      })
      return user;
    }catch (error) {
      throw error;
    }
  }

  async findAdminByRice(rice_id: number): Promise<UserRice> {
    try{
      const user = await this.userRepo.findOne({
        where: {
          role: {
            role_key: 'ADMIN',
          },
        },
      })
      const userRice = await this.userRiceRepo.findOne({
        where: {
          rice_id,
          user_id: user.id,
        }
      })
      console.log(userRice)
      return userRice;
    }catch (error) {
      throw error;
    }
  }

  async findUserByRice(email: string, rice_id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: {
        email: email,
      },
      relations: {
        rice: true,
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

      let isAddressExist = false;
      let address_wallet = '';
      while (!isAddressExist){
        address_wallet = '0x0' + this.generateRandomString( 39);
        const user = await this.userRepo.findOne({
          where: { address_wallet: address_wallet}
        })
        if(!user){
          isAddressExist = true;
        }
      }
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
        address_wallet: address_wallet,
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

  validateHash(password: string, hash: string): boolean {
    if (!password || !hash) {
      return false;
    }
    return bcrypt.compareSync(password, hash);
  }
  async changePassword(id: number, body: ChangePasswordDTO): Promise<User> {
    try{
      const { currentPassword, password } = body;
      let user = await this.userRepo.findOne({
        where: { id }
      })
      if(!user){
        throw code.USER_NOT_FOUND.type;
      }
      if(!this.validateHash(currentPassword, user.password)){
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
      let user = await this.userRepo.findOne({
        where: { email }
      })

      if(!user){
        throw code.EMAIL_NOT_EXIST.type;
      }

      const random6number = Math.floor(100000 + Math.random() * 900000)
      const newPassword = 'PW' + random6number;

      //Send mail
      const result = await this.sendEmail(email, newPassword);
      if(!result){
        throw 'BACKEND';
      }

      user.password = UtilsProvider.generateHash(md5(md5(newPassword)));
      return await this.userRepo.save(user);
    }catch (error) {
      throw error;
    }
  }

  async sendEmail(email: string, newPassword: string){
    const send = await this.mailerService.sendMail({
      to: email,
      subject: 'Your password to sign in!',
      html: '<div style="padding:15px;background-color:#f5f6fa"><div style="width:512px;margin:0 auto"><div class="adM">\n' +
          '  </div><div style="border-bottom:1px solid #2f3640;padding:7px 0;border-radius:6px 6px 0 0;display:flex;background-color:#2f3640"><div class="adM">\n' +
          '    </div><div style="margin:0 auto;display:flex"><div class="adM">\n' +
          '     \n' +
          '    </div><strong style="margin-left:15px;margin-top:2px;font-size:20px;color:white!important">RICE CORE </strong>\n' +
          '    </div>\n' +
          '  </div>\n' +
          '  <div style="padding:15px;background-color:#ffffff">\n' +
          '    <span style="text-align:center;display:block;margin-bottom:10px;color:#2f3640!important;font-size:15px;font-weight:500">Your password to sign in!</span>\n' +
          '        <div style="text-align:center">\n' +
          '            <div style="border:2px solid #273c75;display:inline-block;padding:3px 7px;height:30px;line-height:30px;margin:0 auto;text-align:center;color:#273c75;font-weight:800;font-size:21px">\n' +
          newPassword + '\n' +
          '            </div>\n' +
          '            </div>\n' +
          '  </div>\n' +
          '  <div style="background:#ffffff;border-top:1px solid #eee;border-bottom:1px solid #eee;text-align:center;padding:10px 0;font-size:13px;font-style:italic;color:#718093!important">\n' +
          '     Rice Core - 2023\n' +
          '  </div><div class="yj6qo"></div><div class="adL">\n' +
          '  </div><div style="width:100%;height:4px;border-radius:0 0 6px 6px;background-color:#2f3640" class="adL">\n' +
          '</div><div class="adL">\n' +
          '</div></div></div>',
      context: {
        name: 'name'
      }
    })
    if(send) return true;
    else throw 'BACKEND';
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

  //Transaction
  async transferMoney(emailSender: string,emailReceiver: string, amount: number): Promise<void> {
    const queryRunner  = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      // Minutes money sender
      const sender = await queryRunner.manager.findOne(User,{
        where: { email: emailSender }
      })
      sender.balance -= amount;
      await queryRunner.manager.save(sender);

      // Plus money receiver
      const receiver = await queryRunner.manager.findOne(User,{
        where: { email: emailReceiver }
      })
      receiver.balance += amount;
      await queryRunner.manager.save(receiver);

      // Commit transaction
      await queryRunner.commitTransaction();
    }catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    }finally {
      await queryRunner.release();
    }
  }

  async buyRice(emailSender: string,emailReceiver: string, amount: number, rice_id: number): Promise<void> {
      const queryRunner  = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try{
        // Plus Rice for buyer
        const buyer = await queryRunner.manager.findOne(User,{
          where: { email: emailSender }
        })
        const userRiceBuyer = await queryRunner.manager.findOne(UserRice, {
          where: {
            rice_id,
            user_id: buyer.id,
          }
        })
        if(userRiceBuyer){
          userRiceBuyer.quantity += amount;
          await queryRunner.manager.save(userRiceBuyer);
        }else {
          const newUserRice = await queryRunner.manager.create(UserRice,{
            rice_id,
            user_id: buyer.id,
            quantity: amount,
          })
          await queryRunner.manager.save(newUserRice);
        }


        // Minutes Rice for buyer
        const seller = await queryRunner.manager.findOne(User,{
          where: { email: emailReceiver }
        })
        const userRiceSeller = await queryRunner.manager.findOne(UserRice, {
          where: {
            rice_id,
            user_id: seller.id,
          }
        })
        if(!userRiceSeller){
          throw code.RICE_NOT_FOUND.type;
        }
        userRiceSeller.quantity -= amount;
        await queryRunner.manager.save(userRiceSeller);

        // Commit transaction
        await queryRunner.commitTransaction();
      }catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      }finally {
        await queryRunner.release();
      }
    }


}
