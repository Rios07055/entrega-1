import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photo/entities/photo.entity';

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn()
  listing_id: number;

  @ManyToOne(() => User, (user) => user.user_id)
  user_id: User;

  @Column()
  @IsNotEmpty()
  @IsString()
  title: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  address: string;

  @Column('decimal')
  @IsNotEmpty()
  latitude: number;

  @Column('decimal')
  @IsNotEmpty()
  longitude: number;

  @Column('decimal')
  @IsNotEmpty()
  price_per_night: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  num_bedrooms: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  num_bathrooms: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  max_guests: number;

  @OneToMany(() => Photo, (photo) => photo.listing_id)
  photos?: Photo[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
