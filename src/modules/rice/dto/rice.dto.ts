import {
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';


export class RicePostDTO {
    @ApiProperty({ example: 'name' })
    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'image' })
    @Expose()
    @IsNotEmpty()
    @IsString()
    image: string;


    @ApiProperty({ example: 'totalQuantity' })
    @Expose()
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    totalQuantity: number;

    price: number;


}

export class RicePutDTO {
    @ApiProperty({ example: 'name' })
    @Expose()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'image' })
    @Expose()
    @IsNotEmpty()
    @IsString()
    image: string;


    // @ApiProperty({ example: 'totalQuantity' })
    // @Expose()
    // @IsNotEmpty()
    // @Type(() => Number)
    // @IsInt()
    totalQuantity: number;

    price: number;
}



