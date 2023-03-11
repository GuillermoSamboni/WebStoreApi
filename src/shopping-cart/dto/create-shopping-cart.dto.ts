import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateShoppingCartDto {

    
    @IsNotEmpty()
    @IsString()
    _idP: String

    @IsNotEmpty()
    @IsNumber()
    idProduct: Number

    @IsNotEmpty()
    @IsString()
    name: String

    @IsNotEmpty()
    @IsString()
    shortDescription: String

    @IsNotEmpty()
    @IsString()
    price: String

    @IsNotEmpty()
    @IsString()
    amount: String

    @IsNotEmpty()
    @IsString()
    createAt: string;

    @IsNotEmpty()
    @IsString()
    updateAt: string;

    @IsNotEmpty()
    @IsString()
    _idUser: String    

    @IsNotEmpty()
    @IsString()
    nameUser: String
       
}
