import { Controller, Get } from '@nestjs/common';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(
    private readonly goodsService: GoodsService
  ) {}

  @Get("/all")
  getGoods() {
    return this.goodsService.getAllGoods();
  }
}
