import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import {User} from "./user.entity";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    type: string;

    @Column()
    status: string;

    @Column()
    image: string;

    @Column({ type: 'double' })
    amount: number;

    @Column()
    description: string;

    @Column()
    from_address: string;

    @Column()
    to_address: string;

    @Column()
    from_email: string;

    @Column()
    to_email: string;

    @Column()
    from_user: string;

    @Column()
    to_user: string;

    @CreateDateColumn({ name: 'created_at' })
    public created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updated_at: Date;

    @UpdateDateColumn({ name: 'delete_at' })
    public delete_at: Date;

    // Many to many User
    @ManyToOne(() => User, (user) => user.transactions, {
        onDelete: 'SET NULL',
    })
    user: User;
}
