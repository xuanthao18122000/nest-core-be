import {ApiProperty} from "@nestjs/swagger";
import {Expose, Type} from "class-transformer";
import {IsEmail, IsInt, IsNotEmpty, IsString} from "class-validator";

export class SendMoneyUserDTO {
    @ApiProperty({ example: 'amount' })
    @Expose()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    amount: number;

    @ApiProperty({ example: 'receiverEmail' })
    @Expose()
    @IsEmail()
    @IsNotEmpty()
    receiverEmail: string;

    @ApiProperty({ example: 'description' })
    @Expose()
    @IsNotEmpty()
    @IsString()
    description: string;


}

export class SendMoneyExchangesDTO {
    @ApiProperty({ example: 'amount' })
    @Expose()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    amount: number;

    @ApiProperty({ example: 'description' })
    @Expose()
    @IsNotEmpty()
    @IsString()
    description: string;


}