/** 订单商品参数类型 */
export type OrderGoodType = {
  goodId: number
  goodNUm: number
  orderId: string
}

/** 订单参赛类型 */
export type Order = {
  orderId: string
}

/** 订单参赛类型 */
export type OrderDetail = {
  id: number
  title: string
  description: string
  presetMoney: string
  discount: string
  realMoney: string
}