import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/core/entity/orderDetail.entity';
import { OrderRepository } from 'src/core/repository/order.repository';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderRepository, OrderDetail]),
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
