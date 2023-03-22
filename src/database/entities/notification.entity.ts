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
export class Notification {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    type: string;

    @Column()
    title: string;

    @Column()
    image: string;

    @Column()
    description: string;

    @Column()
    content: string;

    @Column()
    is_read: boolean;

    @Column()
    transaction_id: number;

    @CreateDateColumn({ name: 'created_at' })
    public created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updated_at: Date;

    @UpdateDateColumn({ name: 'delete_at' })
    public delete_at: Date;

    // Many to one User
    @ManyToOne(() => User, (users) => users.notification, {
        onDelete: 'SET NULL',
    })
    user: User;
}
