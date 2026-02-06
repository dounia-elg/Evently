import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PDFDocument from 'pdfkit';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepo: Repository<Ticket>,
  ) {}

  async createTicket(reservation: any): Promise<Ticket> {
    const ticket = this.ticketRepo.create({ reservation });
    return this.ticketRepo.save(ticket);
  }

  async findByReservationId(reservationId: string): Promise<Ticket | null> {
    return this.ticketRepo.findOne({ 
      where: { reservation: { id: reservationId } },
      relations: ['reservation', 'reservation.event', 'reservation.participant']
    });
  }

  async generateTicketPdf(ticket: Ticket): Promise<Buffer> {
    return new Promise((resolve) => {
      const doc = new PDFDocument({ size: 'A6', margin: 20 });
      const chunks: Buffer[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      doc.fontSize(20).text('OFFICIAL TICKET', { align: 'center' });
      doc.moveDown();
      
      doc.fontSize(12).text(`Ticket ID: ${ticket.id}`); 
      doc.moveDown();
      doc.text(`Event: ${ticket.reservation.event.title}`);
      doc.text(`Date: ${ticket.reservation.event.dateTime.toLocaleString()}`);
      doc.text(`Location: ${ticket.reservation.event.location}`);
      doc.moveDown();
      doc.text(`Guest: ${ticket.reservation.participant.firstName} ${ticket.reservation.participant.lastName}`);
      
      doc.end();
    });
  }
}
