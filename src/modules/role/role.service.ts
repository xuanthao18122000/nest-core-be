import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterPostDTO } from '../auth/dto/index';
import { SendResponse } from 'src/utils/send-response';
import { appDataSource } from 'src/configs/datasource';
import { UtilsProvider } from 'src/utils/provider';
import { Role } from '../../database/entities/role.entity';
import {Service} from "../../database/entities/service.entity";

@Injectable()
export class RoleService {
  constructor(
      @InjectRepository(Role)
      private readonly roleRepo: Repository<Role>,

  ) {}

  async createRoles(){
    try{
      const roles = await this.roleRepo.find();
      if(roles.length === 0){
        const listRole = [
          {role_key: 'ADMIN', role_name: 'admin'},
          {role_key: 'USER', role_name: 'user'},
        ]
        const createRoles = await this.roleRepo
            .createQueryBuilder()
            .insert()
            .into(Role)
            .values(listRole)
            .execute();
      }
      return true
    }catch(err) {
      throw err;
    }
  }

  async findRole(role){
    try{
      return await this.roleRepo.findOne({
        where: {
          role_name: role,
        }
      });
    }catch(err) {
      throw 'BACKEND';
    }
  }

}
