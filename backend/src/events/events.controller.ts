import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { User, UserRole } from '../users/entities/user.entity';
import { UpdateEventDto } from './dto/update-event.dto';
import { StatusUpdateDto } from './dto/status-update.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() dto: CreateEventDto, @Req() req: { user: User }) {
    return this.eventsService.create(dto, req.user);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.update(id, dto);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  updateStatus(@Param('id') id: string, @Body() dto: StatusUpdateDto) {
    return this.eventsService.updateStatus(id, dto.status);
  }

  @Get('all')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAllAdmin() {
    return this.eventsService.findAll();
  }

  @Get()
  findAllPublic() {
    return this.eventsService.findPublished();
  }

  @Get(':id')
  findOnePublic(@Param('id') id: string) {
    return this.eventsService.findOnePublished(id);
  }
}
