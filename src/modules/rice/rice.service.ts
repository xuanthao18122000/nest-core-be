import { QueryListDto } from "../../global/dto/query-list.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Rice } from "../../database/entities";
import { Repository } from "typeorm";
import code from "../../configs/code";

export class RiceService{
  constructor(
    @InjectRepository(Rice)
    private readonly riceRepo: Repository<Rice>
  ){}

  async getAllRice(query: QueryListDto){
    try{
      const { keyword, page, perPage, sort } = query;
      const rice = await this.riceRepo.findAndCount({
        skip: (page - 1) * perPage,
        take: perPage,
        order: { id: sort as SORT },
      })
      return { list: rice[0], count: rice[1] };
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
}