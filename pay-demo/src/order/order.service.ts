import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/core/entity/orderDetail.entity';
import { OrderInterface, OrdersInterface } from 'src/core/interface/order.interface';
import { OrderRepository } from 'src/core/repository/order.repository';
import { getConnection } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository
  ) {}

  async createNewOrder(): Promise<OrderInterface> {
    try {
      const orderDetail = new OrderDetail();
      orderDetail.title = "测试" + Date.now();
      orderDetail.presetMoney = "111111111";
      orderDetail.discount = "222222" + 111;
      orderDetail.realMoney = "3333333333";
      const orderDetailRepo = getConnection().getRepository(OrderDetail);
      const _orderDetail = await orderDetailRepo.save(orderDetail);
      console.log("_orderDetail: ", _orderDetail);
      
      return this.orderRepository.createNewOrder(_orderDetail);
    } catch (error) {
    }
  }

  /** 查看所有的订单 */
  async getAllOrders(): Promise<OrdersInterface> {
    return this.orderRepository.getAllOrders();
  }
}
