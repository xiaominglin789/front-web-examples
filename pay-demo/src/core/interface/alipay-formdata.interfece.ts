/** 支付form参数声明 */
export interface AliPayFormData {
  /** 商户订单号-传过来的code */
  outTradeNo: string
  /** 前端-成功通知跳转的地址 */
  returnUrl: string
  /** 总价格 */
  totalAmount: string
  /** 分类名称 */
  subject: string
  /** 详细名称 */
  body: string
}

/** 查询支付结果-form参数声明 */
export interface QueryPayResultFormData {
  out_trade_no: string
  trade_no: string
}
