import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, In } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { Event, EventStatus } from '../events/entities/event.entity';
import { ReservationStatus } from './entities/reservation.entity';
import { TicketsService } from '../tickets/tickets.service';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
    private readonly ticketsService: TicketsService,
  ) {}

  async create(eventId: string, user: User): Promise<Reservation> {
    const event = await this.eventRepo.findOne({ where: { id: eventId } });
    if (!event) throw new NotFoundException('Event not found');

    if (event.status !== EventStatus.PUBLISHED) {
      throw new BadRequestException(
        'You can only reserve for published events',
      );
    }

    const existing = await this.reservationRepo.findOne({
      where: { event: { id: eventId }, participant: { id: user.id } },
    });
    if (existing)
      throw new ConflictException('You have already reserved for this event');

    const currentReservations = await this.reservationRepo.count({
      where: {
        event: { id: eventId },
        status: Not(In([ReservationStatus.CANCELED])),
      },
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

  async updateStatus(
    id: string,
    newStatus: ReservationStatus,
  ): Promise<Reservation> {
    const reservation = await this.reservationRepo.findOne({
      where: { id },
      relations: ['event', 'participant'],
    });
    if (!reservation) throw new NotFoundException('Reservation not found');

    if (newStatus === ReservationStatus.CONFIRMED) {
      const confirmedCount = await this.reservationRepo.count({
        where: {
          event: { id: reservation.event.id },
          status: ReservationStatus.CONFIRMED,
        },
      });
      if (confirmedCount >= reservation.event.maxCapacity) {
        throw new BadRequestException(
          'Cannot confirm: Event is at full capacity',
        );
      }
      reservation.status = newStatus;

      const savedReservation = await this.reservationRepo.save(reservation);
      await this.ticketsService.createTicket(savedReservation);

      return savedReservation;
    }

    reservation.status = newStatus;
    return this.reservationRepo.save(reservation);
  }

  async cancel(id: string, user: User): Promise<Reservation> {
    const reservation = await this.reservationRepo.findOne({
      where: { id },
      relations: ['participant'],
    });
    if (!reservation) throw new NotFoundException('Reservation not found');

    if (
      user.role !== UserRole.ADMIN &&
      reservation.participant.id !== user.id
    ) {
      throw new ForbiddenException('You can only cancel your own reservation');
    }

    reservation.status = ReservationStatus.CANCELED;
    return this.reservationRepo.save(reservation);
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationRepo.findOne({
      where: { id },
      relations: ['participant', 'event'],
    });
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationRepo.find({
      relations: ['participant', 'event'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByParticipant(userId: string): Promise<Reservation[]> {
    return this.reservationRepo.find({
      where: { participant: { id: userId } },
      relations: ['event'],
      order: { createdAt: 'DESC' },
    });
  }
}
