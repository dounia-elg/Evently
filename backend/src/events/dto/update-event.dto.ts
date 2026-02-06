import { IsString, IsInt, IsDateString, MinLength, Min } from 'class-validator';


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

}
