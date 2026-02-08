import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Event } from '../events/entities/event.entity';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Event]), TicketsModule],
  providers: [ReservationsService],
  controllers: [ReservationsController],
  exports: [ReservationsService],
})
export class ReservationsModule {}
