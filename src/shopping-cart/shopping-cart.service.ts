import { ConflictException, Injectable } from '@nestjs/common';
import { CreateShoppingCartDto } from './dto/create-shopping-cart.dto';
import { UpdateShoppingCartDto } from './dto/update-shopping-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ShoppingCart, ShoppingCartDocument } from './schema/shopping-cart.schema';
import { Model } from 'mongoose';
import { StructureResponse } from 'src/utils/StructureResponse';
import { ShoppingCartResponseDto } from './dto/response/ShoppingCartResponseDto';
import { ResponseGlobal } from 'src/utils/ResponseGlobal';
import { QueryUserById } from 'src/utils/QueryUserById';

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
    let allProductsInShoppingCart;
    
    if (queryUserById && queryUserById._id) {
      allProductsInShoppingCart = await this.shoppingCartModule.find({ _id: queryUserById._id }).exec();
    } else {
      // Si queryUserById no está definido o no tiene una propiedad _id, devuelve un array vacío
      allProductsInShoppingCart = [];
    }
  
    // Devuelve la respuesta
    response.data = allProductsInShoppingCart;
    response.count = allProductsInShoppingCart.length;
  
    return response;
  }

  // async findAll(queryUserById: QueryUserById): Promise<StructureResponse<ShoppingCartResponseDto>> {
  //   const response = new StructureResponse<ShoppingCartResponseDto>()
  //   const allProductsInShoppingCart = await this.shoppingCartModule.find({ _id: queryUserById._id }).exec();

  //   if (!allProductsInShoppingCart) {
  //     response.codeStatus = ResponseGlobal.codeNotFound
  //     response.count = allProductsInShoppingCart.length
  //     response.message = ResponseGlobal.messageNotFound
  //     response.error = ResponseGlobal.messageNotFound
  //     response.data = []
  //   }

  //   response.codeStatus = ResponseGlobal.codeSucces
  //   response.count = allProductsInShoppingCart.length
  //   response.message = ResponseGlobal.messageSucces
  //   response.error = ResponseGlobal.messageSuccesNotFound
  //   response.data = allProductsInShoppingCart.map(cart => {
  //     const cartResponseDto = new ShoppingCartResponseDto()
  //     cartResponseDto._idP = cart._id.toString()
  //     cartResponseDto.idProduct = cart.idProduct
  //     cartResponseDto.name = cart.name
  //     cartResponseDto.shortDescription = cart.shortDescription
  //     cartResponseDto.price = cart.price
  //     cartResponseDto.amount = cart.amount
  //     cartResponseDto.createAt = cart.createAt
  //     cartResponseDto.updateAt = cart.updateAt
  //     cartResponseDto._idUser = cart._idUser
  //     cartResponseDto.nameUser = cart.nameUser
  //     return cart
  //   })

  //   return response

  // }

  findOne(id: number) {
    return `This action returns a #${id} shoppingCart`;
  }

  update(id: number, updateShoppingCartDto: UpdateShoppingCartDto) {
    return `This action updates a #${id} shoppingCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shoppingCart`;
  }
}
