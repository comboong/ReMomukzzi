import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm"

@Entity()
export class Shop_pic {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    shop_id : number;

    @Column()
    pic_URL : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
}