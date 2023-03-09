import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './schema/Products.schema';
import { StructureResponse } from 'src/utils/StructureResponse';
import { ResponseGlobal } from 'src/utils/ResponseGlobal';
import { DataProductResponseDto } from './dto/response/DataProductResponseDto';


@Injectable()
export class ProductsService {
  constructor(@InjectModel(Products.name) private productModule: Model<ProductsDocument>,) { }

  async create(createProductDto: CreateProductDto): Promise<StructureResponse<DataProductResponseDto>> {
    try {
      const response = new StructureResponse<DataProductResponseDto>();
      const createProduct = await this.productModule.create(createProductDto);
      response.codeStatus = ResponseGlobal.codeSucces;
      response.message = ResponseGlobal.messageSucces;
      response.count = 1;
      response.data = Array.isArray(createProduct) ? createProduct : [createProduct];
      return response;
    } catch (error) {      
      if (error.code === 11000) {
        const fieldName = Object.keys(error.keyValue)[0]; // Obtiene el nombre del campo que ha causado la violación de restricción única
        const message = `Duplicate value found for field '${fieldName}'`; // Crea un mensaje de error descriptivo
        throw new ConflictException(message);
      }

      throw error;
    }
  }

  async getAll(): Promise<StructureResponse<DataProductResponseDto>> {
    const response = new StructureResponse<DataProductResponseDto>(); // agregamos <dataProductResponseDto> como el parámetro de tipo genérico
    const products = await this.productModule.find();

    response.codeStatus = ResponseGlobal.codeSucces;
    response.message = ResponseGlobal.messageSucces;

    response.count = products.length;
    response.data = products.map(product => {
      const productDto = new DataProductResponseDto();
      productDto.idProduct = product.id;
      productDto.name = product.name;
      productDto.decription = product.decription;
      productDto.price = product.price;
      productDto.amountStock = product.amountStock;
      productDto.category = product.category;
      productDto.image = product.image;
      productDto.skuCodeProduct = product.skuCodeProduct;
      productDto.brand = product.brand;
      productDto.model = product.model;
      productDto.weightInKilos = product.weightInKilos;
      productDto.dimensions = product.dimensions;
      productDto.createAt = product.createAt;
      productDto.updateAt = product.updateAt;
      productDto.labels = product.labels;

      return productDto;
    });

    return response;
  }

  async findOne(id: string): Promise<StructureResponse<DataProductResponseDto>> {
    const response = new StructureResponse<DataProductResponseDto>();
    const productFind = await this.productModule.findById(id);
    if (!productFind) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    response.codeStatus = ResponseGlobal.codeSucces;
    response.message = ResponseGlobal.messageSucces;
    response.count = 1;
    response.data = Array.isArray(productFind) ? productFind : [productFind];
    return response;
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<StructureResponse<DataProductResponseDto>> {
    const response = new StructureResponse<DataProductResponseDto>();
    const updatedProduct = await this.productModule.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    response.codeStatus = ResponseGlobal.codeSucces;
    response.message = ResponseGlobal.messageSucces;
    response.count = 1;
    response.data = Array.isArray(updatedProduct) ? updatedProduct : [updatedProduct];

    return response;
  }

  async delete(id: string): Promise<StructureResponse<DataProductResponseDto>> {
    const response = new StructureResponse<DataProductResponseDto>();
    const deleteProduct = await this.productModule.findByIdAndRemove(id);

    if (!deleteProduct) {
      throw new NotFoundException('Product with ID ${id} not found')
    }
    response.codeStatus = ResponseGlobal.codeSucces;
    response.message = ResponseGlobal.messageSucces;
    response.count = 1;
    response.data = Array.isArray(deleteProduct) ? deleteProduct : [deleteProduct];

    return response
  }
}
