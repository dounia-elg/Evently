import { IsEnum } from 'class-validator';
import { EventStatus } from '../entities/event.entity';

export class StatusUpdateDto {
  @IsEnum(EventStatus)
  status: EventStatus;
}
