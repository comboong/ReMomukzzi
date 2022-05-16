import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn, ManyToOne} from "typeorm"
import { Shops } from "./shops.entity";

@Entity()
export class Menu {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    shopId: number
    @ManyToOne(()=> Shops,(shop) => shop.id,{ nullable: false, onDelete: 'CASCADE' } )
    shop : Shops

    @Column()
    menu_name : string;

    @Column({default: 0})
    price : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}