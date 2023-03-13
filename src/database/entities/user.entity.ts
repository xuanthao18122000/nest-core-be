import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable, PrimaryColumn, DeleteDateColumn,
} from 'typeorm';
import { Account } from './account.entity';
import { Notification } from './notification.entity';
import { Role } from './role.entity';
import {Transaction} from "./transaction.entity";
import {Rice} from "./rice.entity";
import {IsNotEmpty} from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
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

  @DeleteDateColumn({ name: 'delete_at' })
  public delete_at: Date;

  @OneToMany(() => Account, (account) => account.user, {
    onDelete: 'SET NULL',
  })
  accounts: Account[];

  @OneToMany(() => Notification, (notification) => notification.user, {
    onDelete: 'SET NULL',
  })
  notifications: Notification[];

  @OneToMany(() => Transaction, (transaction) => transaction.users, {
    onDelete: 'SET NULL',
  })
  transactions: Transaction[];

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

  @ManyToMany(() => Rice, (rice) => rice.users)
  @JoinTable({
    name: 'rice_user',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'rice_id',
      referencedColumnName: 'id',
    },

  })
  rice: Rice[];


}

@Entity('rice_user')
export class UserRice {
  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  user_id: number;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn()
  rice_id: number;

  @Column({type: 'int' })
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;


}
