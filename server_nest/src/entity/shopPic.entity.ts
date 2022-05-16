import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,ManyToOne} from "typeorm"
import { Shops } from "./shops.entity";

@Entity()
export class Shop_pic {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    pic_URL : string;

    @Column()
    shopId : number;
    @ManyToOne(()=> Shops,(shop) => shop.id,{ nullable: false, onDelete: 'CASCADE', cascade: ['insert', 'update'] } )
    shop : Shops

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;


}