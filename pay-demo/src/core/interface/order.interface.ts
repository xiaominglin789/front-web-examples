import { Order } from "../entity/order.entity";

export interface OrderInterface {
  order: Order
}

export interface OrdersInterface {
  orders: Order[]
  count: number
}