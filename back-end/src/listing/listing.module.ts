import { Module } from '@nestjs/common';
import { ListingService } from './listing.service';
import { ListingController } from './listing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Photo } from 'src/photo/entities/photo.entity';

@Module({
  controllers: [ListingController],
  providers: [ListingService],
  imports: [TypeOrmModule.forFeature([Listing, Photo])],
})
export class ListingModule {}
