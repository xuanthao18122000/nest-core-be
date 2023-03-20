import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany, ManyToMany, DeleteDateColumn, JoinTable,
} from 'typeorm';
import {User} from "./user.entity";

export enum typeServer {
    AUTO = 'auto',
    MANUAL = 'manual',
}

@Entity()
export class Rice {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column({unique: true})
    name: string;

    @Column()
    images: string;

    @Column({ type: 'int' })
    totalQuantity: number;

    @Column({ type: 'double' })
    price: number;

    // @Column()
    // status_price: string;

    @CreateDateColumn({ name: 'created_at' })
    public created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    public updated_at: Date;

    @DeleteDateColumn({ name: 'delete_at' })
    public delete_at: Date;

    // Many to many User
    @ManyToMany(() => User, (user) => user.rice,{onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    users: User[];
    @ManyToMany(
        () => User,
        user => user.rice, //optional
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'})
    @JoinTable({
        name: 'user_rice',
        joinColumn: {
            name: 'rice_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
    })
    user?: User[];
}
