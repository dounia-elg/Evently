import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) {}

  @Post()
  @Roles(UserRole.PARTICIPANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateReservationDto, @Req() req: any) {
    return this.reservationsService.create(dto.eventId, req.user);
  }
}
