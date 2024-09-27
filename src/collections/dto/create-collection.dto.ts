import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsNotEmpty()
  productIds: number[];
}
