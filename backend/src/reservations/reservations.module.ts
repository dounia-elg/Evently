import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Event } from '../events/entities/event.entity';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Event])
  ],
  providers: [ReservationsService],
  controllers: [ReservationsController],
})
export class ReservationsModule { }