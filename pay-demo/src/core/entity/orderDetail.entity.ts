import { Column,  Entity,  PrimaryGeneratedColumn } from "typeorm";
import { AppBaseEntity } from "./base";

@Entity({
  name: "order_detail"
})
export class OrderDetail extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, comment: "订单标题" })
  title: string;

  @Column({ nullable: true, comment: "订单说明" })
  description: string;

  @Column({ nullable: false, name: "preset-money", comment: "预计价格" })
  presetMoney: string;

  @Column({ nullable: false, name: "discount", comment: "优惠、折扣的金额" })
  discount: string;

  @Column({ nullable: false, name: "real-money", comment: "实际价格" })
  realMoney: string;
}
