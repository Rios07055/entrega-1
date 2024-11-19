import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty, IsDate } from 'class-validator';
import { Listing } from 'src/listing/entities/listing.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  booking_id: number;

  @ManyToOne(() => Listing, (listing) => listing.listing_id)
  listing_id: Listing;

  @ManyToOne(() => User, (user) => user.user_id)
  user_id: User;

  @Column()
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @Column()
  @IsNotEmpty()
  @IsDate()
  end_date: Date;

  @Column('decimal')
  @IsNotEmpty()
  total_price: number;

  @CreateDateColumn()
  created_at: Date;
}
