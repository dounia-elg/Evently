import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { ReservationsModule } from './reservations/reservations.module';
import { Ticket } from './tickets/entities/ticket.entity';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Event, Reservation, Ticket],
      synchronize: true,
    }),

    AuthModule,
    UsersModule,
    EventsModule,
    ReservationsModule,
    TicketsModule,
  ],
})
export class AppModule {}
