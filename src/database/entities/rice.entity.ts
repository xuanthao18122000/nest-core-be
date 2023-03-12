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
export class Rice {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    name: string;

    @Column()
    images: string;

    @Column({ type: 'int' })
    totalQuantity: number;

    @Column({ type: 'double' })
    price: number;

    @CreateDateColumn({ name: 'created_at' })
    public created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updated_at: Date;

    @UpdateDateColumn({ name: 'delete_at' })
    public delete_at: Date;

    // Many to many User
}
