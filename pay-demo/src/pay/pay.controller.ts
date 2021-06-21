import { HttpException, HttpService, Logger } from '@nestjs/common';
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { PayDTO } from 'src/core/dto/pay/pay.dto';
import { AliPayFormData } from 'src/core/interface/alipay-formdata.interfece';
import { OrderRepository } from 'src/core/repository/order.repository';
import { PayService } from './pay.service';

@Controller('pay')
export class PayController {

  constructor(
    private readonly payService: PayService,
  ) {}

  @Post()
  async doPay(@Body() body: PayDTO) {
    console.log("参数: ", body);
    const { orderId } = body;
    
    if (!orderId) {
      throw new BadRequestException("缺失重要参数");
    }

    return this.payService.doExecPay(orderId)
  }

  /** 支付结果查询-返回支付校验后的结果 */
  @Post("/queryOrder")
  async doQueyPayResult(@Body() body) {
    const { out_trade_no, trade_no } = body;
    if (!out_trade_no || !trade_no) {
      throw new HttpException("参数异常", 400);
    }

    return this.payService.doExecQueryPayResult({ out_trade_no, trade_no });
  }
}
