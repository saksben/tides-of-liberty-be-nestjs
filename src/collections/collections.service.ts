import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.collection.findMany({
      include: { products: true },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.collection.findUnique({
      where: { slug },
      include: { products: true },
    });
  }

  async getProductsByCollection(collectionSlug: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { slug: collectionSlug },
      include: { products: true },
    });
    if (!collection) {
      throw new Error(`Collection with slug ${collectionSlug} not found`);
    }
    return collection.products;
  }

  async create(createCollectionDto: CreateCollectionDto) {
    const { name, slug, productIds } = createCollectionDto;

    return this.prisma.collection.create({
      data: {
        name,
        slug,
        products: {
          connect: productIds.map((id) => ({ id })),
        },
      },
      include: { products: true },
    });
  }

  async update(slug: string, updateCollectionDto: UpdateCollectionDto) {
    const { name, productIds } = updateCollectionDto;
    try {
      const productsExist = await this.prisma.product.findMany({
        where: { id: { in: productIds } },
      });
      if (productsExist.length !== productIds.length) {
        throw new Error('Some product IDs do not exist.');
      }
      return await this.prisma.collection.update({
        where: { slug },
        data: {
          name,
          products: {
            connect: productIds.map((id) => ({ id })),
          },
        },
        include: { products: true },
      });
    } catch (error) {
      throw new Error(`Failed to update collection: ${error.message}`);
    }
  }

  async delete(slug: string) {
    return this.prisma.collection.delete({
      where: { slug },
    });
  }
}
