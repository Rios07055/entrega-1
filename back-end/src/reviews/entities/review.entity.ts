import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { Listing } from 'src/listing/entities/listing.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => Listing, (listing) => listing.listing_id)
  listing_id: Listing;

  @ManyToOne(() => User, (user) => user.user_id)
  user_id: User;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
