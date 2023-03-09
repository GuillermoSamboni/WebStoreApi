import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://gsamrua07:I3OomtDngu2nxbCO@webstoreclauster.hlfyj9d.mongodb.net/WebStore?retryWrites=true&w=majority&connectTimeoutMS=30000'),
    ProductsModule,
    UsersModule,
    AuthModule,
    ShoppingCartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
