import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {

  constructor(
    private readonly orderService: OrderService
  ) {}
  
  /** 生成唯一订单 */
  @Get("/create")
  generalOrder() {
    return this.orderService.createNewOrder();
  }

  /** 查看所有的订单 */
  @Get("/all")
  getAllOrderRecord() {
    return this.orderService.getAllOrders();
  }
}
