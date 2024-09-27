import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll() {
    return this.collectionsService.findAll();
  }

  @Get(':slug')
  async findBySlug(@Param('slug') slug: string) {
    return this.collectionsService.findBySlug(slug);
  }

  @Get(':collectionSlug/products')
  async getProductsInCollection(
    @Param('collectionSlug') collectionSlug: string,
  ) {
    return this.collectionsService.getProductsByCollection(collectionSlug);
  }

  @Post()
  async create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionsService.create(createCollectionDto);
  }

  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionsService.update(slug, updateCollectionDto);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return this.collectionsService.delete(slug);
  }
}
