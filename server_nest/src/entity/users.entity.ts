import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn,OneToMany} from "typeorm"
import { Bookmark } from "./bookmark.entity";
import {Review} from "./review.entity"

@Entity()
export class Users {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    user_id : string;

    @Column()
    password : string;

    @Column()
    email : string;

    @Column()
    nickname : string;

    @Column({default: 0})
    total_review : number;

    @Column({default : false})
    oauth : boolean;
    
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @OneToMany(() => Review, (review) => review.user)
    reviews : Review[]
    
    @OneToMany(() => Bookmark, (bookmark) => bookmark.user_id)
    bookmarks : Bookmark[]

}

