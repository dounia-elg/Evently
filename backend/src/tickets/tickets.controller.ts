import { Controller, Get, Param, UseGuards, Req, Res, StreamableFile, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import type { Response } from 'express';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) { }

    @Get(':reservationId/download')
    @Roles(UserRole.PARTICIPANT)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async downloadTicket(
        @Param('reservationId') reservationId: string,
        @Req() req: any,
        @Res({ passthrough: true }) res: Response,
    ) {

        const ticket = await this.ticketsService.findByReservationId(reservationId);

        if (!ticket) {
            throw new NotFoundException('Ticket not found. Ensure your reservation is confirmed!');
        }

        const buffer = await this.ticketsService.generateTicketPdf(ticket);

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="ticket-${ticket.id}.pdf"`,
        });

        return new StreamableFile(buffer);
    }
}
