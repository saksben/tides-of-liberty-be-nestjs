import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const cart = await this.prisma.cart.upsert({
      where: { userId },
      update: {
        products: {
          upsert: {
            create: { productId, quantity },
            update: { quantity: { increment: quantity } },
            where: { cartId_productId: { cartId: userId, productId } },
          },
        },
      },
      create: { userId, products: { create: { productId, quantity } } },
    });
    return cart;
  }
  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: { userId },
      include: {
        products: {
          include: { product: true },
        },
      },
    });
  }
}
