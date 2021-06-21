import { Injectable } from '@nestjs/common';
import { GoodRepository } from 'src/core/repository/good.repository';

@Injectable()
export class GoodsService {
  constructor(
    private readonly goodRepository: GoodRepository
  ) {}

  /** 生成新商品 */
  async createNewGood() {
    return this.goodRepository.createNewGood();
  }

  /** 获取商品列表-未做分页 */
  async getAllGoods() {
    return this.goodRepository.getAllGoods();
  }
}
