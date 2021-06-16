import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderInterface, OrdersInterface } from 'src/core/interface/order.interface';
import { OrderRepository } from 'src/core/repository/order.repository';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private readonly orderRepository: OrderRepository
  ) {}

  async createNewOrder(): Promise<OrderInterface> {
    return this.orderRepository.createNewOrder();
  }

  /** 查看所有的订单 */
  async getAllOrders(): Promise<OrdersInterface> {
    return this.orderRepository.getAllOrders();
  }
}
