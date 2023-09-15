import { NotEquals, IsPositive, IsNumber } from 'class-validator';

export class CreateProductStockDto {
  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  readonly branchId: number;

  @IsNumber()
  @NotEquals(null)
  @IsPositive()
  readonly productId: number;
}

export class UpdateProductStockDto {
  @IsNumber()
  @NotEquals(null)
  @NotEquals(0)
  readonly stock: number;
}
