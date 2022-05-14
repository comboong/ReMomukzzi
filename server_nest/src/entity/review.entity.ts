import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne, OneToMany} from "typeorm"
import { Shops } from "./shops.entity";
import {Users} from "./users.entity"
import {Review_pic} from "./review_pic.entity"
@Entity()
export class Review {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    comment : string;

    @Column({default: 0})
    star : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => Shops, (shops) => shops.id,{ nullable: false, onDelete: 'CASCADE' })
    shop : Shops

    @ManyToOne(() => Users, (users) => users.id,{ nullable: false, onDelete: 'CASCADE' })
    user : Users

    @OneToMany(() => Review_pic, (review_pic) => review_pic.id)
    review_pic : Review_pic[]
}