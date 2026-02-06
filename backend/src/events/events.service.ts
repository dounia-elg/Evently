import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private repo: Repository<Event>,
  ) {}

  async create(dto: CreateEventDto, admin: User): Promise<Event> {
    const event = this.repo.create({
      ...dto,
      admin,
    });
    return this.repo.save(event);
  }
}
