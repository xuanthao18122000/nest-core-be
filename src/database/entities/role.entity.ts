import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  public role_id: number;

  @Column({ type: 'varchar', length: 30 })
  public role_key: string;

  @Column({ type: 'varchar', length: 30 })
  public role_name: string;


  @ManyToMany(() => User, (user) => user.role)
  user: User[];

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deleted_at: Date;
}
