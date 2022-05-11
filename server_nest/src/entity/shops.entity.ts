import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

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

    @Column()
    total_review : string;

    @Column({default: 0})
    star_avg : number;

    @Column()
    work_time : string;

    @Column()
    holiday : string;

    @Column()
    map_id : number;

    @Column()
    x : number;

    @Column()
    y : number;

    @Column()
    status : boolean;
}