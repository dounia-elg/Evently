import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reservation, ReservationStatus } from './entities/reservation.entity';
import { Event, EventStatus } from '../events/entities/event.entity';
import { TicketsService } from '../tickets/tickets.service';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';

describe('ReservationsService', () => {
    let service: ReservationsService;
    let reservationRepo: jest.Mocked<Repository<Reservation>>;
    let eventRepo: jest.Mocked<Repository<Event>>;
    let ticketsService: jest.Mocked<TicketsService>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReservationsService,
                {
                    provide: getRepositoryToken(Reservation),
                    useValue: {
                        findOne: jest.fn(),
                        count: jest.fn(),
                        create: jest.fn(),
                        save: jest.fn(),
                    },
                },
                {
                    provide: getRepositoryToken(Event),
                    useValue: {
                        findOne: jest.fn(),
                    },
                },
                {
                    provide: TicketsService,
                    useValue: {
                        createTicket: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<ReservationsService>(ReservationsService);
        reservationRepo = module.get(getRepositoryToken(Reservation));
        eventRepo = module.get(getRepositoryToken(Event));
        ticketsService = module.get(TicketsService);
    });

    describe('create', () => {
        it('should throw NotFoundException if event does not exist', async () => {
            eventRepo.findOne.mockResolvedValue(null);
            await expect(service.create('1', { id: 'user-1' } as any)).rejects.toThrow(NotFoundException);
        });

        it('should throw BadRequestException if event is not published', async () => {
            eventRepo.findOne.mockResolvedValue({ id: '1', status: EventStatus.DRAFT } as any);
            await expect(service.create('1', { id: 'user-1' } as any)).rejects.toThrow(BadRequestException);
        });

        it('should throw ConflictException if already reserved', async () => {
            eventRepo.findOne.mockResolvedValue({ id: '1', status: EventStatus.PUBLISHED } as any);
            reservationRepo.findOne.mockResolvedValue({ id: 'res-1' } as any);
            await expect(service.create('1', { id: 'user-1' } as any)).rejects.toThrow(ConflictException);
        });

        it('should throw BadRequestException if event is full', async () => {
            eventRepo.findOne.mockResolvedValue({ id: '1', status: EventStatus.PUBLISHED, maxCapacity: 10 } as any);
            reservationRepo.findOne.mockResolvedValue(null);
            reservationRepo.count.mockResolvedValue(10);
            await expect(service.create('1', { id: 'user-1' } as any)).rejects.toThrow(BadRequestException);
        });

        it('should create a reservation successfully', async () => {
            const event = { id: '1', status: EventStatus.PUBLISHED, maxCapacity: 10 } as any;
            const user = { id: 'user-1' } as any;
            const reservation = { id: 'res-1', event, participant: user };

            eventRepo.findOne.mockResolvedValue(event);
            reservationRepo.findOne.mockResolvedValue(null);
            reservationRepo.count.mockResolvedValue(5);
            reservationRepo.create.mockReturnValue(reservation as any);
            reservationRepo.save.mockResolvedValue(reservation as any);

            const result = await service.create('1', user);
            expect(result).toBe(reservation);
        });
    });

    describe('updateStatus', () => {
        it('should confirm reservation and trigger ticket creation', async () => {
            const reservation = {
                id: 'res-1',
                status: ReservationStatus.PENDING,
                event: { id: 'ev-1', maxCapacity: 100 },
                participant: { id: 'u-1' }
            } as any;

            reservationRepo.findOne.mockResolvedValue(reservation);
            reservationRepo.count.mockResolvedValue(10); // confirmed count
            reservationRepo.save.mockImplementation((res) => Promise.resolve(res) as any);


            const result = await service.updateStatus('res-1', ReservationStatus.CONFIRMED);

            expect(result.status).toBe(ReservationStatus.CONFIRMED);
            expect(ticketsService.createTicket).toHaveBeenCalled();
        });
    });
});
