import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty({ message: 'El URL de la foto es obligatorio' })
  @IsString({ message: 'El URL de la foto debe ser una cadena de texto' })
  photo_url: string;

  @IsOptional()
  @IsNumber({}, { message: 'El ID de la lista debe ser un número' })
  listing_id?: number;
}
