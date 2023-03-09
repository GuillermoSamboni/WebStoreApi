import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
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
  async findAll(queryUserById: QueryUserById): Promise<StructureResponse<ShoppingCartResponseDto>> {
    return await this.shoppingCartService.findAll(queryUserById);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shoppingCartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShoppingCartDto: UpdateShoppingCartDto) {
    return this.shoppingCartService.update(+id, updateShoppingCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shoppingCartService.remove(+id);
  }
}
