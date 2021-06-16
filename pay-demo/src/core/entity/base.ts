import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export class AppBaseEntity {
  @CreateDateColumn({ name: "create_time", comment: "创建的时间" })
  createTime: Date;

  @UpdateDateColumn({ name: "update_time", comment: "更新的时间" })
  updateTime: Date;

  @DeleteDateColumn({ name: "delete_time", comment: "上次删除的时间" })
  deleteTime: Date;
}
