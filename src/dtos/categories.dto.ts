import { IsString, IsNotEmpty, MaxLength, NotEquals } from 'class-validator';

export class CategoryDto {
  @IsString()
  @NotEquals(null)
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;
}
