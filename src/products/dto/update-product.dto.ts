import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    readonly idProduct?: Number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @Length(250)
    readonly decription: string;
    
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly price: number;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    readonly amountStock: number;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly category: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly image: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly skuCodeProduct: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    readonly model: number;

    @IsOptional()
    @IsNumber()
    readonly weightInKilos: number;

    @IsOptional()
    @IsString()
    readonly dimensions: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly createAt: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly updateAt: string;    

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    readonly labels: string;
}
