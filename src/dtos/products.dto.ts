import {
  IsString,
  IsNumber,
  IsBoolean,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  MaxLength,
  NotEquals,
  Min,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(200)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(200)
  readonly description: string;

  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  readonly price: number;

  @IsUrl()
  @IsOptional()
  readonly image: string;

  @IsBoolean()
  @IsOptional()
  readonly isBlocked: boolean;

  @IsBoolean()
  @IsOptional()
  readonly isFavourite: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @IsPositive()
  minPrice: number;

  @IsOptional()
  @IsPositive()
  maxPrice: number;

  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsPositive()
  categoryId: number;
}
