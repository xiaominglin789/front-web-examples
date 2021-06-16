import { EntityRepository, Repository } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Order } from "../entity/order.entity";
import { OrderInterface, OrdersInterface } from "../interface/order.interface";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  
  /** 生成新订单 */
  async createNewOrder(): Promise<OrderInterface> {
    try {
      const order = new Order();
      
      order.code = uuid();

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
