import { QueryListDto } from "../../global/dto/query-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import {Rice, User, UserRice} from "../../database/entities";
import { Repository } from "typeorm";
import code from "../../configs/code";
import {RicePostDTO, RicePutDTO} from "./dto";
import * as fs from 'fs';
import { join } from 'path';

export class RiceService{
  constructor(
    @InjectRepository(Rice)
    private readonly riceRepo: Repository<Rice>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserRice)
    private readonly userRiceRepo: Repository<UserRice>,
  ){}

  async getAllRice(query: QueryListDto){
    try{
      const { keyword, page, perPage, sort } = query;
      const rice = await this.riceRepo.findAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        order: { id: sort as SORT },
      })
      let listRice = rice[0];
      for(let i = 0; i < listRice.length; i++){
        const userRice = await this.userRiceRepo.findOne( {
          where: {
            rice_id: listRice[i].id,
            user_id: 1,
          }
        })
        // @ts-ignore
        listRice[i].quantity = userRice.quantity;
      }
      listRice = listRice.filter( rice => {
        // @ts-ignore
        return rice.quantity > 0
      })

      return { list: listRice, count: rice[1] };
    }catch (error) {
      throw error;
    }
  }

  async getOneRice(id: number) {
    try{
      const oneRice = await this.riceRepo.findOne({
        where: { id }
      })

      if(!oneRice){
        throw code.RICE_NOT_FOUND.type;
      }
      return oneRice;
    }catch (error) {
      throw error;
    }
  }

  async getAllBalanceRice() {
    try{
      const rice = await this.riceRepo.find({
        select: { totalQuantity: true }
      })

      let balance = 0;
      for(let item of rice){
        balance += item.totalQuantity
      }
      return {balance};
    }catch (error) {
      throw error;
    }
  }

  async findRiceById(id: number) {
    try{
      return await this.riceRepo.findOne({
        where: { id: id }
      })
    }catch (error) {
      throw error;
    }
  }

  async findNameRice(name: string) {
    try{
      return await this.riceRepo.findOne({
        where: { name }
      })
    }catch (error) {
      throw error;
    }
  }

  async getRiceUser(user: User, query: QueryListDto) {
    try{
      const { keyword, page, perPage, sort } = query;
      const rice = await this.riceRepo.findAndCount({
        where: {
          user: {
            id: user.id,
          }
        },
        skip: (page - 1) * perPage,
        take: perPage,
        order: { id: sort as SORT },
      })

      let listRice = rice[0];
      for(let i = 0; i < listRice.length; i++){
        const userRice = await this.userRiceRepo.findOne( {
          where: {
            rice_id: listRice[i].id,
            user_id: user.id,
          }
        })
        // @ts-ignore
        listRice[i].quantity = userRice.quantity;
      }
      listRice = listRice.filter( rice => {
        // @ts-ignore
        return rice.quantity > 0
      })
      return { list: listRice, count: rice[1] };
    }catch (error) {
      throw error;
    }
  }

  async createRice(user, body: RicePostDTO){
    try{
      const { name, totalQuantity, images } = body;
      const rice = await this.riceRepo.create({
        name,
        images,
        totalQuantity,
        price: totalQuantity,
        status_price: 'up',
      });
      const newRice = await this.riceRepo.save(rice);
      const newUserRice = await this.userRiceRepo.create({
        rice_id: newRice.id,
        user_id: user.id,
        quantity: totalQuantity,
      })
      await this.userRiceRepo.save(newUserRice);
      await this.moveFile(images);
      return true
    }catch (error) {
      console.log(error)
      throw error;
    }
  }

  async moveFile(imageName) {
    const tempPath = join(__dirname,'../../..', 'src/upload/temp', imageName);
    const imgPath = join(__dirname,'../../..', 'src/upload/images', imageName);

    console.log(join(__dirname,'../../..', 'src/upload/temp', imageName))
    fs.rename(tempPath, imgPath, function (err) {
      if (err) {
        console.log(err)
        throw err;
      } else {
        console.log("Successfully moved the file!");
      }
    });
  }

  async updateRice(id: number, body: RicePutDTO){
    try{
      const { name, image } = body;
      const rice = await this.riceRepo.findOne({
        where: { id }
      })
      if (!rice) {
        throw code.RICE_NOT_FOUND.type;
      }

      rice.name = name;
      rice.images = image;
      return await this.riceRepo.save(rice);
    }catch (error) {
      throw error;
    }
  }

  async updatePriceRice(rice_id: number) {
    try{
      const rice = await this.riceRepo.findOne({
        where: { id: rice_id }
      })
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

      rice.price = rice.totalQuantity / userRice.quantity;
      return await this.riceRepo.save(rice);
    }catch (error) {
      throw error;
    }
  }

  async deleteRice(id: number): Promise<Rice> {
    try{
      const rice = await this.riceRepo.findOne({
        where: { id }
      })

      if(!rice){
        throw code.RICE_NOT_FOUND.type;
      }

      rice.delete_at = new Date();
      return await this.riceRepo.save(rice);
    }catch (error) {
      throw error;
    }
  }
}