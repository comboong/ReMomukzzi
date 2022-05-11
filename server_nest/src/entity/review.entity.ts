import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm"

@Entity()
export class Review {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    user_id : number;

    @Column()
    shop_id : number;

    @Column()
    comment : string;

    @Column({default: 0})
    star : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}