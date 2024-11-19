import { IsNotEmpty, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsOptional()
  @IsNumber({}, { message: 'El ID de la lista debe ser un número' })
  listing_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  user_id?: number;

  @IsNotEmpty({ message: 'La fecha de inicio es obligatoria' })
  @IsDate({ message: 'La fecha de inicio debe ser una fecha válida' })
  start_date: Date;

  @IsNotEmpty({ message: 'La fecha de fin es obligatoria' })
  @IsDate({ message: 'La fecha de fin debe ser una fecha válida' })
  end_date: Date;

  @IsNotEmpty({ message: 'El precio total es obligatorio' })
  @IsNumber({}, { message: 'El precio total debe ser un número' })
  total_price: number;
}
