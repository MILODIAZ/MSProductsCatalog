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
