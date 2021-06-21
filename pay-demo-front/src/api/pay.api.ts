import { get, post } from "../utils/http";

/** 生成订单号 */
export const generalOrder = (async () => {
  return get("/api/order/create", {});
})

/** 调用支付页 */
export const onPrePay = async (orderId: string) => {
  return post("/api/pay", { orderId });
}

/** 获取商品数据 */
export const getAllGoods = async () => {
  return get("/api/goods/all", {});
}
