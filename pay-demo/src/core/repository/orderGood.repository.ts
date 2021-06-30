import { EntityRepository, Repository } from "typeorm";
import { OrderGood } from "../entity/orderGood.entity";
import { OrderGoodInterface } from "../interface/order-good.interface";

@EntityRepository(OrderGood)
export class OrderGoodRepository extends Repository<OrderGood> {
  async createOrderGood(payload: OrderGoodInterface): Promise<OrderGood> {
    try {
      const { goodId, goodNum, orderId } = payload;

      const newOrderGood = new OrderGood();
      newOrderGood.goodId = goodId;
      newOrderGood.goodNum = goodNum
      newOrderGood.orderId = orderId

      const res = await this.save(newOrderGood);
      return res;
    } catch (error) {
      throw error
    }
  }
}
