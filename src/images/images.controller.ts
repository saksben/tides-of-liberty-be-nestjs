import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('product/:productId')
  async findAllByProduct(@Param('productId') productId: number) {
    return this.imagesService.findAllByProduct(productId);
  }

  @Post()
  async create(@Body() createImageDto: CreateImageDto) {
    return this.imagesService.create(createImageDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.imagesService.remove(id);
  }
}
