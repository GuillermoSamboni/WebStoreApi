import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProducstSchema } from 'src/products/schema/Products.schema';
import { ShoppingCart, ShoppingCartSchema } from './schema/shopping-cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ShoppingCart.name,
        schema: ShoppingCartSchema
      }
    ])
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService]
})
export class ShoppingCartModule { }
