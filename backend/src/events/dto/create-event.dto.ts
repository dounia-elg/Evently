import { IsString, IsInt, IsDateString, MinLength, Min, IsEnum, IsOptional } from 'class-validator';
import { EventStatus } from '../entities/event.entity';

export class CreateEventDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  dateTime: string;

  @IsString()
  location: string;

  @IsInt()
  @Min(1)
  maxCapacity: number;

  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;
}
