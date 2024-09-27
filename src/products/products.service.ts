import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findBySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
    });
  }

  async create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
      },
    });
  }

  async update(slug: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      where: { slug },
      data: updateProductDto,
    });
  }

  async delete(slug: string) {
    return this.prisma.product.delete({
      where: { slug },
    });
  }
}
