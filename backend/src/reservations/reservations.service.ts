import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { User } from '../users/entities/user.entity';
import { Event, EventStatus } from '../events/entities/event.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  async create(eventId: string, user: User): Promise<Reservation> {
    
    const event = await this.eventRepo.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');
    
    if (event.status !== EventStatus.PUBLISHED) {
      throw new BadRequestException('You can only reserve for published events');
    }

    const existing = await this.reservationRepo.findOne({
      where: { event: { id: eventId }, participant: { id: user.id } }
    });
    if (existing) throw new ConflictException('You have already reserved for this event');

    const currentReservations = await this.reservationRepo.count({
      where: { event: { id: eventId } }
    });
    if (currentReservations >= event.maxCapacity) {
      throw new BadRequestException('This event is already full');
    }

    const reservation = this.reservationRepo.create({
      event,
      participant: user,
    });

    return this.reservationRepo.save(reservation);
  }
}
