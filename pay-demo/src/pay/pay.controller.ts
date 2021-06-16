import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PayDTO } from 'src/core/dto/pay/pay.dto';
import { OrderRepository } from 'src/core/repository/order.repository';

@Controller('pay')
export class PayController {

  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository
  ) {}

  @Post()
  async doPay(@Body() body: PayDTO) {
    console.log("参数: ", body);
    const { code } = body;
    
    if (!code) {
      throw new Error("参数缺失: code");
    }
    
    const has = await this.orderRepository.findOne({
      code
    });

    if (!has) {
      throw new BadRequestException("订单号无效");
    }

    return has;
  }
}
