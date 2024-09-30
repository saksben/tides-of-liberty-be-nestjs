import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(
    @Req() req: Request,
    @Body()
    body: {
      total: number;
      products: { productId: number; quantity: number }[];
    },
  ) {
    const userId = req.user.id; // Assuming you have user authentication middleware
    return this.orderService.createOrder(userId, body.total, body.products);
  }
}
