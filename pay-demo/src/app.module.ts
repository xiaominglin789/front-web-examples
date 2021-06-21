import { Module } from '@nestjs/common';
import { PayModule } from './pay/pay.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './core/config/db.config';
import { ConfigModule } from '@nestjs/config';
import { GoodsModule } from './goods/goods.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfig
    }),
    OrderModule,
    PayModule,
    GoodsModule
  ]
})
export class AppModule {}
