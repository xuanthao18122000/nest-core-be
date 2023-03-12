import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Account } from './account.entity';
import { Notification } from './notification.entity';
import { Role } from './role.entity';
import {Transaction} from "./transaction.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column()
  phone: number;

  @Column()
  address_wallet: string;

  @Column({type: 'double' })
  balance: number;

  @Column({type: 'int' })
  code: number;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;

  @OneToMany(() => Account, (account) => account.user, {
    onDelete: 'SET NULL',
  })
  accounts: Account[];

  // @OneToMany(() => Notification, (notification) => notification.user, {
  //   onDelete: 'SET NULL',
  // })
  // notifications: Notification[];

  // @OneToMany(() => Transaction, (transaction) => transaction.user, {
  //   onDelete: 'SET NULL',
  // })
  // transactions: Transaction[];

  @ManyToMany(() => Role, (role) => role.user)
  @JoinTable({
    name: 'role_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'role_id',
    },
  })
  role: Role[];
}
