import { HttpException } from "@nestjs/common";
import { EntityRepository, getConnection, Repository } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "../entity/order.entity";
import { OrderDetail } from "../entity/orderDetail.entity";
import { OrderInterface, OrdersInterface } from "../interface/order.interface";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  
  /** 生成新订单 */
  async createNewOrder(orderDetail: OrderDetail): Promise<OrderInterface> {
    if (!orderDetail) {
      throw new HttpException("服务器异常", 500);
    }

    try {
      const order = new Order();
      
      order.orderId = uuid();
      
      order.orderDetail = orderDetail;

      const res = await this.save(order);

      return {
        order: res
      };
    } catch (error) {
     throw error;
    }
  }

  /** 查看订单列表记录-未分页 */
  async getAllOrders(): Promise<OrdersInterface> {
    try {
      const [orders, count ] = await this.findAndCount();

      return {
        orders,
        count
      };
    } catch (error) {
      throw error;
    }
  }
}
