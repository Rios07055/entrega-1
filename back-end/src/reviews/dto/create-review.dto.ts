import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsOptional()
  @IsNumber({}, { message: 'El ID de la lista debe ser un número' })
  listing_id?: number;

  @IsOptional()
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  user_id?: number;

  @IsNotEmpty({ message: 'La calificación es obligatoria' })
  @IsNumber({}, { message: 'La calificación debe ser un número' })
  rating: number;

  @IsOptional()
  @IsString({ message: 'El comentario debe ser un texto válido' })
  comment?: string;
}
