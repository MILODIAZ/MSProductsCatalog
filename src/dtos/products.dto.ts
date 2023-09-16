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
  IsArray,
  ArrayNotEmpty,
  Min,
  ValidateIf,
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

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  readonly categoriesIds: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  readonly branchesIds: number[];
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

  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
