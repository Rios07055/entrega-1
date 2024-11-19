import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Listing } from './entities/listing.entity';
import { Repository } from 'typeorm';
import { Photo } from 'src/photo/entities/photo.entity';

@Injectable()
export class ListingService {
  constructor(
    @InjectRepository(Listing)
    private listingRepository: Repository<Listing>,
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async create(createListingDto: CreateListingDto) {
    try {
      const result = await this.listingRepository.save(createListingDto);
      if (createListingDto.photo_url) {
        const photoEntity = new Photo();
        photoEntity.photo_url = createListingDto.photo_url;
        photoEntity.listing_id = result;
        await this.photoRepository.save(photoEntity);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  findAll() {
    return this.listingRepository.find({
      relations: ['photos'],
    });
  }

  findOne(id: number) {
    return this.listingRepository.findOne({
      where: {
        listing_id: id,
      },
      relations: ['photos'],
    });
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return this.listingRepository.update(id, updateListingDto);
  }

  remove(id: number) {
    return this.listingRepository.delete({
      listing_id: id,
    });
  }
}
