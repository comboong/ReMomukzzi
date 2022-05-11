import {Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from "typeorm"

@Entity()
export class Menu {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    shop_id : number;

    @Column()
    menu_name : string;

    @Column({default: 0})
    price : number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;
}