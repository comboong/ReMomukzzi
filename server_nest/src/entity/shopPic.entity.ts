import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,ManyToOne} from "typeorm"
import { Shops } from "./shops.entity";

@Entity()
export class Shop_pic {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    pic_URL : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @ManyToOne(()=> Shops,(shop) => shop.id,{ nullable: false, onDelete: 'CASCADE' } )
    shop : Shops
}