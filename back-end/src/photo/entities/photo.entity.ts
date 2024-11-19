import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Listing } from 'src/listing/entities/listing.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  photo_id: number;

  @ManyToOne(() => Listing, (listing) => listing.listing_id)
  listing_id: Listing;

  @Column()
  @IsNotEmpty()
  @IsString()
  photo_url: string;

  @CreateDateColumn()
  created_at: Date;
}
