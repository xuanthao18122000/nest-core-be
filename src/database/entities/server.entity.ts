import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Service } from './service.entity';

export enum typeServer {
  AUTO = 'auto',
  MANUAL = 'manual',
}

@Entity()
export class Server {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  ip: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column({
    type: 'enum',
    enum: typeServer,
    default: typeServer.MANUAL,
  })
  type: typeServer;

  @Column({ type: 'double' })
  memory: number;

  @Column({ type: 'double' })
  used: number;

  @Column({ type: 'double' })
  cpu: number;

  @Column({ type: 'int' })
  cpus: number;

  @Column({ type: 'bigint' })
  uptime: number;

  @Column()
  platform: string;

  @Column()
  tracking: number;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;

  @OneToMany(() => Service, (service) => service.server)
  services: Service[];
}
