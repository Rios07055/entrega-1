import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty({ message: 'El emisor del mensaje es obligatorio' })
  @IsString({ message: 'El emisor del mensaje debe ser tipo string' })
  sender_user_id: string;

  @IsNotEmpty({ message: 'El receptor del mensaje es obligatorio' })
  @IsString({ message: 'El receptor del mensaje debe ser tipo string' })
  receiver_user_id: string;

  @IsString({ message: 'La propiedad relacionada debe ser tipo string' })
  listing_id?: string[];

  @IsNotEmpty({ message: 'El mensaje es obligatorio' })
  @IsString({ message: 'El mensaje debe ser un texto' })
  message: string;
}
