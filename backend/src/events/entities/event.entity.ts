import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum EventStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CANCELED = 'CANCELED',
}

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  dateTime: Date;

  @Column()
  location: string;

  @Column()
  maxCapacity: number;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.DRAFT,
  })
  status: EventStatus;

  @ManyToOne(() => User)
  admin: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
