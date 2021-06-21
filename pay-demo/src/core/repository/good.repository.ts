import { HttpException } from "@nestjs/common";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { Good } from "../entity/good.entity";

@EntityRepository(Good)
export class GoodRepository extends Repository<Good> {
  
  /** 生成新商品 */
  async createNewGood() {
    try {
    } catch (error) {
     throw error;
    }
  }

  /** 获取商品列表-未做分页 */
  async getAllGoods(): Promise<Good[]> {
    try {
      const goods = await this.find();
      return goods;
    } catch (error) {
      throw error;
    }
  }
}
