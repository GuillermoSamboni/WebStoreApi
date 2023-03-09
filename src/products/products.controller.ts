import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { DataProductResponseDto } from './dto/response/DataProductResponseDto';
import { StructureResponse } from 'src/utils/StructureResponse';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post('/create')
  async create(@Body() createProductDto: CreateProductDto): Promise<StructureResponse<DataProductResponseDto>> {
    return await this.productsService.create(createProductDto);
  }

  @Get('/getAll')
  async getAll() {
    return await this.productsService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StructureResponse<DataProductResponseDto>> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<StructureResponse<DataProductResponseDto>> {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: string): Promise<StructureResponse<DataProductResponseDto>> {
    return await this.productsService.delete(id);
  }
}
