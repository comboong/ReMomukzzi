import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm"

@Entity()
export class Shops {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public shop_id : number;

    @Column()
    public tag_id : string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
}