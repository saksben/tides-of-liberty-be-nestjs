import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(
    userId: number,
    total: number,
    products: { productId: number; quantity: number }[],
  ) {
    const order = await this.prisma.order.create({
      data: {
        userId,
        total,
        products: {
          create: products.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });
    return order;
  }
}
