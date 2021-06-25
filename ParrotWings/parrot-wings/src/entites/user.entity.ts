import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Transaction } from './transaction.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  username: string;
  @Column({ type: 'varchar', length: 300 })
  password: string;
  @Column({ type: 'varchar', length: 300, unique: true })
  email: string;

  @OneToMany(() => Transaction, (transaction) => transaction.correspondent)
  sendedTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.recipient)
  getedTransactions: Transaction[];

  @Column({ type: 'decimal' })
  amount: number;
}
