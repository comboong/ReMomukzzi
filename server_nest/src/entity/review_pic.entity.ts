import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm"

@Entity()
export class Review_pic {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    review_id : number;

    @Column()
    pic_URL : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}