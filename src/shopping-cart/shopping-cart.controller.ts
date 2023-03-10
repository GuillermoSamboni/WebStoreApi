import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { StructureResponse } from 'src/utils/StructureResponse';
import { ShoppingCartResponseDto } from './dto/response/ShoppingCartResponseDto';
import { QueryUserById } from 'src/utils/QueryUserById';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('shopping-cart')
@Controller('shopping-cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) { }

  @Post('/addProductToShoppingCart')
  async addProductToShoppingCart(@Body() createShoppingCartDto: CreateShoppingCartDto) {
    return await this.shoppingCartService.addProductToShoppingCart(createShoppingCartDto);
  }

  @Post('/getMyProductsFromShoppingCart')
  async findAll(@Body() queryUserById: QueryUserById): Promise<StructureResponse<ShoppingCartResponseDto>> {
    return await this.shoppingCartService.findAll(queryUserById);
  }

  @Post('/removeItem')
  async removeOne(@Body() queryUserById: QueryUserById): Promise<StructureResponse<ShoppingCartResponseDto>> {
    return await this.shoppingCartService.removeOne(queryUserById);
  }

  @Delete('/removeAllItems/:_id')
  async removeAll(@Param('_id') _idUser: String): Promise<StructureResponse<ShoppingCartResponseDto>> {
    return await this.shoppingCartService.removeAll(_idUser);
  }
}
