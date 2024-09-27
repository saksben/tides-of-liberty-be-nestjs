import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('collections/:collection/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.productsService.findBySlug(slug);
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(slug, updateProductDto);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return this.productsService.delete(slug);
  }
}
