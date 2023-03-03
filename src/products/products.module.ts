import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProducstSchema, Products } from './schema/Products.schema';

@Module({

  imports: [
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: ProducstSchema
      }
    ])
  ],
  
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
