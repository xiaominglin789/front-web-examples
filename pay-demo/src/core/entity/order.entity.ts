import { type } from "os";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AppBaseEntity } from "./base";
import { Good } from "./good.entity";
import { OrderDetail } from "./orderDetail.entity";

@Entity()
export class Order extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "order_id", unique: true, comment: "订单号" })
  orderId: string;

  @Column({ nullable: true, comment:"说明" })
  description: string;

  @OneToOne(type => OrderDetail, orderDetail => orderDetail.id)
  @JoinColumn({name: 'order_detail'})
  orderDetail: OrderDetail;
}
