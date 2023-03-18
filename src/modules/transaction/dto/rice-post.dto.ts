import {ApiProperty} from "@nestjs/swagger";
import {Expose, Type} from "class-transformer";
import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class BuyRiceExchangesDTO {
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

    @ApiProperty({ example: 'rice_id' })
    @Expose()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    rice_id: number;
}