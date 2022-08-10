import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from "typeorm"
import { Bookmark } from "./bookmark.entity";
import { Menu } from "./menu.entity";
import { Review } from "./review.entity"
import { Shop_pic } from "./shopPic.entity";


@Entity()
export class Shops {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    shop_name : string;

    @Column()
    genus : string;

    @Column()
    location : string;

    @Column({default: 0, type : "float"})
    total_review : number;

    @Column({default: 0})
    star_avg : number;

    @Column({nullable : true})
    work_time : string;

    @Column({nullable : true})
    holiday : string;

    @Column()
    map_id : number;

    @Column({type : "real"})
    x : number;

    @Column({type : "real"})
    y : number;

    @Column({default: true})
    status : boolean;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @OneToMany(() => Review, (review) => review.shop)
    reviews : Review[]

    @OneToMany(() => Bookmark, (bookmark) => bookmark.shop)
    bookmark : Bookmark[]

    @OneToMany(() => Menu, (menu) => menu.shop)
    menu : Menu[]

    @OneToMany(() => Shop_pic, (shop_pic) => shop_pic.shop,{ cascade: ['insert', 'update'] })
    Shop_pic : Shop_pic[]

}