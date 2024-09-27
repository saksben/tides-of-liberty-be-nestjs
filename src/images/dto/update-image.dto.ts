import { IsOptional, IsString } from 'class-validator';

export class UpdateImageDto {
  @IsString()
  @IsOptional()
  url?: string;

  @IsString()
  @IsOptional()
  altText?: string;

  @IsOptional()
  productId?: number;
}
