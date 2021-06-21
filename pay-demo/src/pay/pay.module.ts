import { HttpModule, HttpService, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from 'src/core/entity/orderDetail.entity';
import { OrderRepository } from 'src/core/repository/order.repository';
import { AliPayService } from 'src/core/shared/alipay.service';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderDetail
    ]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    })
  ],
  controllers: [PayController],
  providers: [
    PayService,
    AliPayService
  ]
})
export class PayModule {}
