import { BadRequestException, HttpException, HttpService, Injectable } from '@nestjs/common';
import { AlipaySandboxTradeStatusEnum } from 'src/core/enum/alipay.enum';
import { AliPayFormData, QueryPayResultFormData } from 'src/core/interface/alipay-formdata.interfece';
import { OrderRepository } from 'src/core/repository/order.repository';
import { AliPayService } from 'src/core/shared/alipay.service';

@Injectable()
export class PayService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly alipayService:AliPayService,
    private readonly httpService: HttpService
  ) {}

  /** 查询支付结果-未作支付种类(支付宝pc、支付宝移动端、支付宝小程序、支付宝安卓/苹果端、微信支付) */
  async doExecQueryPayResult(queryForm: QueryPayResultFormData): Promise<{msg: string}> {
    // 支付宝支付查询
    const resultForm =  this.alipayService.setPayResultForData(queryForm);

    const result = await this.alipayService.doExecForQueryPayResult(resultForm);

    // 支付宝支付账单比对
    try {
      const payTrade = await this.httpService.get("" + result).toPromise();
      const res = payTrade.data.alipay_trade_query_response;
      let msg = "";
      if (res.code === "10000") {
        switch(res.trade_status) {
          case AlipaySandboxTradeStatusEnum.WAIT_BUYER_PAY:
            msg = "交易创建，等待买家付款";
            break;
          case AlipaySandboxTradeStatusEnum.TRADE_CLOSED:
            msg = "未付款交易超时关闭，或支付完成后全额退款";
            break;
          case AlipaySandboxTradeStatusEnum.TRADE_SUCCESS:
            msg = "交易支付成功";
            break;
          case AlipaySandboxTradeStatusEnum.TRADE_FINISHED:
            msg = "交易结束，不可退款";
            break;
          default:
            break;
        }

        return {
          msg
        }
      } else if(res.code === '40004') {
        console.log("res.code === 40004");
        throw new HttpException("交易不存在", 400);
      } else {
        throw new HttpException("支付宝异常", 400);
      }
    } catch (error) {
      throw new HttpException("支付宝账单检查无效，请联系客服处理", 500);
    }
  }

  async doExecPay(orderId: string) {
    const orderInfo = await this.orderRepository.findOne({
      orderId
    });

    if (!orderInfo) {
      throw new BadRequestException("订单号无效");
    }

    console.log("订单信息: ", orderInfo);
    
    // 支付宝-页面支付, 从 orderInfo中读取本次支付的
    const totalAmount = "12.98" || "9.8";

    const currentPayFormData: AliPayFormData = {
      outTradeNo: orderId,
      returnUrl: process.env.ALIPAY_RETURNURL,
      totalAmount,
      subject: "数码产品",
      body: "手机"
    }
    console.log("支付FormData", currentPayFormData);
    
    const currentPayForm = this.alipayService.setPayForData(currentPayFormData);

    const url = await this.alipayService.doExecForAliPay(currentPayForm);

    return {
      url
    }
  }
}
