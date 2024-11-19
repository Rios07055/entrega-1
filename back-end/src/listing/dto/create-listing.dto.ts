import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateListingDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  title: string;

  @IsNotEmpty({ message: 'La descripción es obligatoria' })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  description: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  address: string;

  @IsNotEmpty({ message: 'La latitud es obligatoria' })
  @IsNumber({}, { message: 'La latitud debe ser un número' })
  latitude: number;

  @IsNotEmpty({ message: 'La longitud es obligatoria' })
  @IsNumber({}, { message: 'La longitud debe ser un número' })
  longitude: number;

  @IsNotEmpty({ message: 'El precio por noche es obligatorio' })
  @IsNumber({}, { message: 'El precio por noche debe ser un número' })
  price_per_night: number;

  @IsNotEmpty({ message: 'El número de habitaciones es obligatorio' })
  @IsNumber({}, { message: 'El número de habitaciones debe ser un número' })
  num_bedrooms: number;

  @IsNotEmpty({ message: 'El número de baños es obligatorio' })
  @IsNumber({}, { message: 'El número de baños debe ser un número' })
  num_bathrooms: number;

  @IsNotEmpty({ message: 'La capacidad máxima de huéspedes es obligatoria' })
  @IsNumber({}, { message: 'La capacidad máxima debe ser un número' })
  max_guests: number;

  @IsString({ message: 'La url de la foto debe ser una cadena de texto' })
  photo_url?: string;
}
