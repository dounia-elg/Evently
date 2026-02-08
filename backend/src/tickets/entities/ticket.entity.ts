import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Reservation)
  @JoinColumn()
  reservation: Reservation;

  @CreateDateColumn()
  createdAt: Date;
}
