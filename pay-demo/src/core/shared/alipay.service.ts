import { HttpException, Injectable } from '@nestjs/common';
import AlipaySdk, { AlipaySdkConfig } from 'alipay-sdk';
import AliPayForm from 'alipay-sdk/lib/form';
import { AliPayFormData, QueryPayResultFormData } from '../interface/alipay-formdata.interfece';

/** 支付宝沙箱支付 */
@Injectable()
export class AliPayService {
  instance: AlipaySdk;

  constructor() {
    if (!this.instance) {
      const config: AlipaySdkConfig = {
        /** 应用ID */
      appId: process.env.ALIPAY_APPID,
      /** 支付宝公钥（需要对返回值做验签时候必填） */
      alipayPublicKey: process.env.ALIPAY_PUBLICKEY,
      /** 应用私钥字符串 */
      privateKey: process.env.ALIPAY_APP_PRIVATEKEY,
      /** 网关 */
      gateway: process.env.ALIPAY_GATEWAY,
      /** 网关超时时间（单位毫秒，默认 5s） */
      timeout: Number(process.env.ALIPAY_TIMEOUT),
      /** 加密方式 */
      signType: 'RSA2',
      /** 驼峰 */
      camelcase: Boolean(process.env.ALIPAY_CAMELCASE),
      }
      this.instance = new AlipaySdk(config);
    }
  }

  /** 设置支付操作formData */
  setPayForData(form: AliPayFormData) {
    const { outTradeNo, returnUrl, totalAmount, subject, body } = form;
    
    const formData = new AliPayForm();
    formData.setMethod("get");
    formData.addField("returnUrl", returnUrl)
    formData.addField('bizContent', {
      productCode: 'FAST_INSTANT_TRADE_PAY',
      outTradeNo,
      totalAmount,
      subject,
      body,
    });

    return formData;
  }

  /** 设置支付结果查询的formData */
  setPayResultForData(form: QueryPayResultFormData) {
    const { out_trade_no, trade_no } = form;

    const formData = new AliPayForm();
    formData.setMethod("get");
    formData.addField('bizContent', {
      out_trade_no,
      trade_no
    });

    return formData;
  }

  /** 执行第三方支付-地址回调 */
  async doExecForAliPay(formData: ReturnType<()=>AliPayForm>) {
    if (!formData) {
      throw new HttpException("支付参数异常,无法操作", 500);
    }

    try {
      const resule = await this.instance.exec(
        "alipay.trade.page.pay",
        {},
        { formData }
      );
      return resule;

    } catch (error) {
      throw error;
    }
  }

  /** 执行支付结果查询 */
  async doExecForQueryPayResult(formData: ReturnType<()=>AliPayForm>) {
    if (!formData) {
      throw new HttpException("支付参数异常,无法操作", 500);
    }

    try {
      const resule = await this.instance.exec(
        "alipay.trade.query",
        {},
        { formData }
      );

      // 与支付宝-对账操作
      
      return resule;
    } catch (error) {
      throw error;
    }
  }
}
