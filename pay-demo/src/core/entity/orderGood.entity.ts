import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AppBaseEntity } from "./base";

/** 订单商品关系表 */
@Entity({
  name: "order_good"
})
export class OrderGood extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "order_id", nullable: false, comment: "订单号" })
  orderId: string;

  @Column({ name: "good_id", nullable: false, comment: "商品id" })
  goodId: number;

  @Column({ name: "good_num", nullable: false, comment: "商品数量" })
  goodNum: number
}
