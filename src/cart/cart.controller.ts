import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post('add')
  async addToCart(
    @Req() req: Request,
    @Body() body: { productId: number; quantity: number },
  ) {
    const userId = req.user.id; // Assuming authentication middleware
    return this.cartService.addToCart(userId, body.productId, body.quantity);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCart(@Req() req: Request) {
    const userId = req.user.id; // Assuming authentication middleware
    return this.cartService.getCart(userId);
  }
}
