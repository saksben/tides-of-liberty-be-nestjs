import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CollectionsController } from './collections/collections.controller';
import { CollectionsService } from './collections/collections.service';
import { CollectionsModule } from './collections/collections.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    CollectionsModule,
    ProductsModule,
    ImagesModule,
  ],
  controllers: [AppController, CollectionsController, ProductsController],
  providers: [AppService, CollectionsService, ProductsService, PrismaService],
})
export class AppModule {}
