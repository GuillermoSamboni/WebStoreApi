import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart, ShoppingCartDocument } from './schema/shopping-cart.schema';
import { Model } from 'mongoose';
import { StructureResponse } from 'src/utils/StructureResponse';
import { ShoppingCartResponseDto } from './dto/response/ShoppingCartResponseDto';
import { ResponseGlobal } from 'src/utils/ResponseGlobal';
import { QueryUserById } from 'src/utils/QueryUserById';
import { NotFoundError, identity } from 'rxjs';

@Injectable()
export class ShoppingCartService {

  constructor(@InjectModel(ShoppingCart.name) private shoppingCartModule: Model<ShoppingCartDocument>,) { }

  async addProductToShoppingCart(createShoppingCartDto: CreateShoppingCartDto): Promise<StructureResponse<ShoppingCartResponseDto>> {
    try {
      const response = new StructureResponse<ShoppingCartResponseDto>()
      const addProduct = await this.shoppingCartModule.create(createShoppingCartDto)
      response.codeStatus = ResponseGlobal.codeSucces;
      response.message = ResponseGlobal.messageSucces;
      response.count = 1;
      response.data = Array.isArray(addProduct) ? addProduct : [addProduct];
      return response
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  async findAll(queryUserById: QueryUserById): Promise<StructureResponse<ShoppingCartResponseDto>> {
    const response = new StructureResponse<ShoppingCartResponseDto>();
    console.log(queryUserById._idUser);
    // Filtrar los artículos del carrito de compras por _id e id de usuario
    const shoppingCartItems = await this.shoppingCartModule
      .find({ _idUser: queryUserById._idUser })
      .exec();
    if (shoppingCartItems.length <= 0) {
      console.log("No hay nada");
      response.count = 0
      response.codeStatus = ResponseGlobal.codeSuccesNotFound
      response.message = ResponseGlobal.messageSuccesNotFound
      response.data = []
    } else {
      response.codeStatus = ResponseGlobal.codeSucces
      response.message = ResponseGlobal.messageSucces
      response.count = shoppingCartItems.length;
      response.data = shoppingCartItems;
    }
    return response;
  }

  async removeOne(queryUserById: QueryUserById): Promise<StructureResponse<ShoppingCartResponseDto>> {
    try {
      console.log(queryUserById._idP);
      
      const findRemove = await this.shoppingCartModule.findOneAndDelete({ _idUser: queryUserById._idUser, _idP: queryUserById._idP }).exec();
      if (!findRemove) {
        throw new NotFoundException(`Product with ID ${queryUserById._idP} not found`);
      }
      const response: StructureResponse<ShoppingCartResponseDto> = {
        codeStatus: ResponseGlobal.codeSucces,
        message: ResponseGlobal.messageSuccesRemoveItem,
        count: 1,
        data: findRemove,
        error: null
      };

      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to remove product with ID ${queryUserById._idP}: ${error.message}`);
    }
  }


  async removeAll(_idUser: String): Promise<StructureResponse<ShoppingCartResponseDto>> {
    try {
      const findRemove = await this.shoppingCartModule.deleteMany({ _idUser: _idUser }).exec();
      if (!findRemove) {
        throw new NotFoundException(`Product with ID ${_idUser} not found`);
      }
      const response: StructureResponse<ShoppingCartResponseDto> = {
        codeStatus: ResponseGlobal.codeSucces,
        message: ResponseGlobal.messageSuccesRemoveItem,
        count: 1,
        data: [],
        error: null
      };

      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to remove product with ID ${_idUser}: ${error.message}`);
    }
  }



}
