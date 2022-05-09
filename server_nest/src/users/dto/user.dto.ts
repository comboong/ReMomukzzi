import { IsString, IsEmail, IsBoolean} from "class-validator";

export class userDto{
    @IsString()
    readonly user_id : string;

    @IsString()
    readonly password : string;

    @IsString()
    readonly nickname : string;

    @IsEmail()
    readonly email : string;
}

export class signinDto{
    @IsString()
    readonly user_id : string;

    @IsString()
    readonly password : string;

    @IsString()
    readonly nickname : string;

    @IsEmail()
    readonly email : string;

    @IsBoolean()
    readonly oauth : boolean;
}

export class userloginDto{
    @IsString()
    readonly user_id : string;

    @IsString()
    readonly password : string;
}