import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
    @ManyToOne(() => User, user => user.sendedTransactions)
    correspondent: User;
    @ManyToOne(() => User, user => user.getedTransactions)
    recipient: User;
    @Column( { type : "decimal"})
    amount: number;
}