import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Event, EventStatus } from './entities/event.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('EventsService', () => {
    let service: EventsService;
    let repo: jest.Mocked<Repository<Event>>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EventsService,
                {
                    provide: getRepositoryToken(Event),
                    useValue: {
                        create: jest.fn(),
                        save: jest.fn(),
                        findOne: jest.fn(),
                        find: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<EventsService>(EventsService);
        repo = module.get(getRepositoryToken(Event));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create and save an event', async () => {
            const dto = { title: 'Test Event', maxCapacity: 100 } as any;
            const admin = { id: 'admin-id' } as any;
            const savedEvent = { id: 'event-id', ...dto, admin };

            repo.create.mockReturnValue(savedEvent);
            repo.save.mockResolvedValue(savedEvent);

            const result = await service.create(dto, admin);
            expect(result).toBe(savedEvent);
            expect(repo.create).toHaveBeenCalledWith({ ...dto, admin });
        });
    });

    describe('findOnePublished', () => {
        it('should throw NotFoundException if event not found or not published', async () => {
            repo.findOne.mockResolvedValue(null);
            await expect(service.findOnePublished('non-existent')).rejects.toThrow(NotFoundException);
        });

        it('should return the event if found and published', async () => {
            const event = { id: '1', title: 'Published Event', status: EventStatus.PUBLISHED };
            repo.findOne.mockResolvedValue(event as any);

            const result = await service.findOnePublished('1');
            expect(result).toBe(event);
        });
    });
});
