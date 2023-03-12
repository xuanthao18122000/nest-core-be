import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  token: string;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @ManyToOne(() => User, (user) => user.accounts, {
    onDelete: 'SET NULL',
  })
  user: User[];
}
