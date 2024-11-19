import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  message_id: string;

  @ManyToOne(() => User, (user) => user.sentMessages, { eager: true })
  @JoinColumn({ name: 'sender_user_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages, { eager: true })
  @JoinColumn({ name: 'receiver_user_id' })
  receiver: User;

  @Column({ type: 'uuid', nullable: true })
  listing_id?: string;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}