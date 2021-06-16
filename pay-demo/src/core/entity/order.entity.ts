import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AppBaseEntity } from "./base";

@Entity()
export class Order extends AppBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, comment: "订单号" })
  code: string;

  @Column({ nullable: true, comment:"说明" })
  description: string;
}
