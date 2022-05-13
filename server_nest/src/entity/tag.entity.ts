import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm"

@Entity()
export class Tag {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public tag : number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
}