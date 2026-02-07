import { Controller, Post, Body, UseGuards, Req, Param, Patch, Delete, Get } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { UpdateReservationStatusDto } from './dto/update-reservation-status.dto';


@Controller('reservations')
export class ReservationsController {
  constructor(private reservationsService: ReservationsService) { }

  @Post()
  @Roles(UserRole.PARTICIPANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateReservationDto, @Req() req: any) {
    return this.reservationsService.create(dto.eventId, req.user);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateReservationStatusDto) {
    return this.reservationsService.updateStatus(id, dto.status);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN, UserRole.PARTICIPANT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  cancel(@Param('id') id: string, @Req() req: any) {
    return this.reservationsService.cancel(id, req.user);
  }

  @Get('all')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllAdmin() {
    return this.reservationsService.findAll();
  }
}
