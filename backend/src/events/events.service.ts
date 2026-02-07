import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from '../users/entities/user.entity';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventStatus } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private repo: Repository<Event>,
  ) { }

  async create(dto: CreateEventDto, admin: User): Promise<Event> {
    const event = this.repo.create({
      ...dto,
      admin,
    });
    return this.repo.save(event);
  }

  async update(id: string, dto: UpdateEventDto): Promise<Event> {
    const event = await this.repo.findOne({ where: { id } });
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }
    Object.assign(event, dto);
    return this.repo.save(event);
  }

  async updateStatus(id: string, newStatus: EventStatus): Promise<Event> {
    const event = await this.repo.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.status === EventStatus.CANCELED) {
      throw new BadRequestException('Cannot change status of a canceled event');
    }
    event.status = newStatus;
    return this.repo.save(event);
  }

  async findPublished(): Promise<Event[]> {
    return this.repo.find({ where: { status: EventStatus.PUBLISHED } });
  }

  async findOnePublished(id: string): Promise<Event> {
    try {
      console.log(`Fetching published event with ID: ${id}`);
      const event = await this.repo.findOne({
        where: {
          id: id as any,
          status: EventStatus.PUBLISHED
        }
      });
      console.log('Event found:', event ? event.title : 'None');
      if (!event) throw new NotFoundException('Event not found or not published');
      return event;
    } catch (error) {
      console.error('Error in findOnePublished:', error);
      throw error;
    }
  }
}
