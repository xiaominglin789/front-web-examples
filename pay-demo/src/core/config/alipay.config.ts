export default () => ({
  alipayConfig: {
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
});
