import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { AppBaseEntity } from "./base";
import { Order } from "./order.entity";

@Entity()
export class Good extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: "entry_img", nullable: false, comment: "主图" })
  entryImg: string;

  @Column({ nullable: false, comment: "标题" })
  title: string;

  @Column({ nullable: true, comment: "简介" })
  remark: string;
  
  @Column({  name: "real_price", nullable: true, comment: "当前最终价格" })
  realPrice: string;
  
  @Column({  name: "preset_price", nullable: true, comment: "预定价格" })
  presetPrice: string;

  @ManyToMany(type => Order, order => order.orderId)
  roders: Order[];
}
