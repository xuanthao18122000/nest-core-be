import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {Server} from './server.entity';

export enum typeService {
  AUTO = 'auto',
  MANUAL = 'manual',
}

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  pid: number;

  @Column({nullable: true})
  name: string;

  @Column({nullable: true})
  extra: string;

  @Column({ type: 'json', nullable: true})
  pm2: string;

  @Column({ type: 'json', nullable: true })
  manual: string;

  @Column({ type: 'json', nullable: true })
  monit: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  id_server: number;

  @Column({ nullable: true })
  type_server: string;

  @Column({
    type: 'enum',
    enum: typeService,
    default: typeService.MANUAL,
  })
  type: typeService;

  @Column({ nullable: true })
  tracking: number;

  @CreateDateColumn({ name: 'created_at' })
  public created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updated_at: Date;

  @ManyToOne(() => Server, (server) => server.services, {
    onDelete: 'SET NULL',
  })
  server: Server[];
}
