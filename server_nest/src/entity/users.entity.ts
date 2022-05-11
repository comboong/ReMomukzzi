import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

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

    @Column()
    oauth : boolean;
}

