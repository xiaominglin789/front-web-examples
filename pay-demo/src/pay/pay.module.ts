import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from 'src/core/repository/order.repository';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository
    ])
  ],
  controllers: [PayController],
  providers: [PayService]
})
export class PayModule {}
