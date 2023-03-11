import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsString } from "class-validator";
import { HydratedDocument } from "mongoose";

export type ShoppingCartDocument = HydratedDocument<ShoppingCart>;

@Schema()
export class ShoppingCart {
    @Prop()
    _idP: String

    @Prop({ required: true })
    idProduct: Number

    @Prop({ required: true })
    name: String

    @Prop({ required: true })
    shortDescription: String

    @Prop({ required: true })
    price: String

    @Prop({ required: true })
    amount: String

    @Prop({ required: true })
    createAt: string;

    @Prop({ required: true })
    updateAt: string;

    @Prop({ required: true })
    _idUser: String

    @Prop({ required: true })
    nameUser: String    
}

export const ShoppingCartSchema = SchemaFactory.createForClass(ShoppingCart);
