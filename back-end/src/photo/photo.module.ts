import { Module } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';

@Module({
  controllers: [PhotoController],
  providers: [PhotoService],
  imports: [TypeOrmModule.forFeature([Photo])],
})
export class PhotoModule {}
