import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm"
import { Shops } from "./shops.entity";
import { Users } from "./users.entity";

@Entity()
export class Bookmark {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    user_id : number;

    @Column()
    shop_id : number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => Shops, (shop) => shop.id,{ nullable: false, onDelete: 'CASCADE' })
    shop : Shops

    @ManyToOne(() => Users, (user) => user.id,{ nullable: false, onDelete: 'CASCADE' })
    user : Users
}