import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn,OneToMany, ManyToOne} from "typeorm"
import {Review} from './review.entity'

@Entity()
export class Review_pic {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    pic_URL : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(() => Review, (review) => review.id,{ nullable: false, onDelete: 'CASCADE' })
    review : Review
}