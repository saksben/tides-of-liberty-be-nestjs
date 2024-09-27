import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCollectionDto {
  @IsString()
  @IsOptional()
  name?: string;
  @IsArray()
  @IsOptional()
  productIds?: number[];
}
