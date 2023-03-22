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
import {IsEmpty, IsNotEmpty} from "class-validator";
import {JoinColumn} from "typeorm";

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

  @Column({nullable: true})
  avatar: string;

  @Column()
  address_wallet: string;

  @Column({type: 'double', unsigned: true })
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

  @OneToMany(() => Notification, (notification) => notification.user)
  notification: Notification[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
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

  @ManyToMany(() => Rice, (rice) => rice.user,{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
  rices: Rice[];
  @ManyToMany(
      () => Rice,
      rice => rice.user, //optional
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
  @JoinTable({
    name: 'user_rice',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'rice_id',
      referencedColumnName: 'id',
    },
  })
  rice?: Rice[];


}

@Entity('user_rice')
export class UserRice {
  @Column()
  @IsNotEmpty()
  @PrimaryColumn({ name: 'user_id' })
  user_id: number;

  @Column()
  @IsNotEmpty()
  @PrimaryColumn({ name: 'rice_id' })
  rice_id: number;

  @ManyToOne(
      () => Rice,
      rice => rice.users,
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'rice_id', referencedColumnName: 'id' }])
  rice: Rice[];

  @ManyToOne(
      () => User,
      user => user.rice,
      {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
  )
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User[];

  @Column({type: 'int', unsigned: true })
  @IsEmpty()
  quantity: number;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;


}
