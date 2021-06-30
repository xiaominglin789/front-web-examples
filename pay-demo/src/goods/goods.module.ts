import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodRepository } from 'src/core/repository/good.repository';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GoodRepository,
    ])
  ],
  controllers: [GoodsController],
  providers: [GoodsService]
})
export class GoodsModule {}
