import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ImagesService, PrismaService],
  controllers: [ImagesController]
})
export class ImagesModule {}
