import { IsInt, IsPositive, MinLength, Min, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  readonly no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
