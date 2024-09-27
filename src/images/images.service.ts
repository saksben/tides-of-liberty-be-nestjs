import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByProduct(productId: number) {
    return this.prisma.image.findMany({
      where: { productId },
    });
  }

  async create(createImageDto: CreateImageDto) {
    return this.prisma.image.create({
      data: createImageDto,
    });
  }

  async update(id: number, updateImageDto: UpdateImageDto) {
    const existingImage = await this.prisma.image.findUnique({
      where: { id },
    });
    if (!existingImage) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return this.prisma.image.update({
      where: { id },
      data: updateImageDto,
    });
  }

  async remove(id: number) {
    const existingImage = await this.prisma.image.findUnique({
      where: { id },
    });
    if (!existingImage) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return this.prisma.image.delete({
      where: { id },
    });
  }
}
