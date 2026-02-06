import { IsString, IsInt, IsDateString, MinLength, Min, IsEnum, IsOptional } from 'class-validator';
import { EventStatus } from '../entities/event.entity';

export class UpdateEventDto {
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

  @IsOptional() 
  @IsEnum(EventStatus)
  status?: EventStatus;
}
